import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { NextUIProvider } from "@nextui-org/react";
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';
import { publicUrl } from '@/helpers/publicUrl.ts';
import { ViewportHeightProvider } from '@/veiwPortContext';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from 'react-redux';
import { store } from '@/store';
import { App } from '@/components/App.tsx';
import MobileApp from './wapper';

function ErrorBoundaryError({ error }: { error: unknown }) {
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === 'string'
            ? error
            : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

export function Root() {

  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
     <ViewportHeightProvider>
        <MobileApp>
          <Provider store={store}>
              <NextUIProvider>
                <TonConnectUIProvider manifestUrl={publicUrl('tonconnect-manifest.json')}>
                  <NextThemesProvider attribute="class" defaultTheme="dark">
                    <App /> {/* I18nextProvider is now moved to the App component */}
                  </NextThemesProvider>
                </TonConnectUIProvider>
              </NextUIProvider>
          </Provider>
        </MobileApp>
      </ViewportHeightProvider>
    </ErrorBoundary>
  );
}
