import { TonConnectUIProvider } from '@tonconnect/ui-react';
import {NextUIProvider} from "@nextui-org/react";
import { App } from '@/components/App.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';
import { publicUrl } from '@/helpers/publicUrl.ts';
import { ViewportHeightProvider } from '@/veiwPortContext';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import {ThemeProvider as NextThemesProvider} from "next-themes";

import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ar from '../locales/ar.json';
import fa from '../locales/fa.json';



i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    ar: { translation: ar },
    fa: { translation: fa },
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

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
        <NextUIProvider>
          <TonConnectUIProvider
            manifestUrl={publicUrl('tonconnect-manifest.json')}
          >
            <NextThemesProvider attribute="class" defaultTheme="dark">
              <I18nextProvider i18n={i18next}>
                <App/>
              </I18nextProvider>
            </NextThemesProvider>
          </TonConnectUIProvider>
        </NextUIProvider>
      </ViewportHeightProvider>
    </ErrorBoundary>
  );
}
