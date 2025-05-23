import React, { ReactNode, FC } from 'react';

interface MultiContextProviderProps {
  contexts: FC<{ children: ReactNode }>[];
  children: ReactNode;
}

/**
 * A component that wraps a list of context providers around a given set of children.
 *
 * @example
 * import React from 'react';
 * import { ThemeProvider } from 'styled-components';
 * import { UserProvider } from '@auth0/nextjs-auth0';
 *
 * const App = () => (
 *   <MultiContextProvider
 *     contexts={[ThemeProvider, UserProvider]}
 *   >
 *     <div>My app</div>
 *   </MultiContextProvider>
 * );
 *
 * @param {ReactNode} children The children to wrap the context providers around.
 * @param {FC<{ children: ReactNode }>[]} contexts The context providers to use.
 */
const MultiContextProvider: React.FC<MultiContextProviderProps> = ({ contexts, children }) => {
  const wrapContexts = (children: ReactNode, contextProviders: FC<{ children: ReactNode }>[]) => {
    return contextProviders.reduceRight((acc, ContextProvider) => {
      return <ContextProvider>{acc}</ContextProvider>;
    }, children);
  };

  return wrapContexts(children, contexts);
};

export default MultiContextProvider;