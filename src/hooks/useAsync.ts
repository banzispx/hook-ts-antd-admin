import { useCallback, useMemo, useState, useReducer } from 'react';
import { useMountedRef } from './useMountedRef';

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

// 确保设置state时，组件是在未卸载的状态下
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const isMountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => {
      if (isMountedRef.current) {
        dispatch && dispatch(...args);
      }
    },
    [isMountedRef, dispatch]
  );
};

const useAsync = <D>(
  initState?: State<D>,
  initConfig?: typeof defaultConfig
) => {
  const config = useMemo(
    () => ({ ...defaultConfig, ...initConfig }),
    [initConfig]
  );

  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initState,
    }
  );

  const saftDispatch = useSafeDispatch(dispatch);

  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: D) => {
      saftDispatch({
        data,
        stat: 'success',
        error: null,
      });
    },
    [saftDispatch]
  );

  const setError = useCallback(
    (error: Error) => {
      saftDispatch({
        error,
        stat: 'error',
        data: null,
      });
    },
    [saftDispatch]
  );

  const run = useCallback(
    (promise: Promise<any>, runConfig: { retry?: () => Promise<D> } = {}) => {
      if (!(promise instanceof Promise)) {
        throw new Error('请传入 Promise 类型数据');
      }
      setRetry(() => () => {
        if (runConfig.retry) {
          run(runConfig.retry(), runConfig);
        }
      });
      saftDispatch({ stat: 'loading' });
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) return Promise.reject(error);
          return error;
        });
    },
    [setData, setError, config, saftDispatch]
  );

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};

export default useAsync;
