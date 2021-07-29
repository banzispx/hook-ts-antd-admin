import React, { Component, PropsWithChildren } from 'react';

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

type Props = PropsWithChildren<{
  fallbackRender: FallbackRender;
}>;

type State = {
  error: Error | null;
};

export default class ErrorBoundary extends Component<Props, State> {
  state = { error: null };
  static gatDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
