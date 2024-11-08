import { TonConnectUIProvider } from '@tonconnect/ui-react';
import {NextUIProvider} from "@nextui-org/react";

import { App } from '@/components/App.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';
import { publicUrl } from '@/helpers/publicUrl.ts';

import {ThemeProvider as NextThemesProvider} from "next-themes";

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
      <NextUIProvider>
        <TonConnectUIProvider
          manifestUrl={publicUrl('tonconnect-manifest.json')}
        >
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <App/>
          </NextThemesProvider>
        </TonConnectUIProvider>
      </NextUIProvider>
    </ErrorBoundary>
  );
}
