import { promises } from 'dns';
import { useCallback, useReducer, useState } from 'react';
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
const useRequest = <D>(initState?: State<D>) => {
  const [state, setState] = useState(defaultInitialState);

  const setData = useCallback(
    (data) => {
      setState({
        data,
        stat: 'success',
        error: null,
      });
    },
    [setState]
  );

  const setError = useCallback(
    (error: Error) => {
      setState({
        error,
        stat: 'error',
        data: null,
      });
    },
    [setState]
  );

  const run = useCallback(
    async (promise: Promise<any>) => {
      setState({ ...state, stat: 'loading' });
      const res = await promise;
      setData(res.data);
    },
    [setData, setError, setState]
  );

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    ...state,
  };
};

export default useRequest;
