import { TonConnectUIProvider } from '@tonconnect/ui-react';
import {NextUIProvider} from "@nextui-org/react";
import { App } from '@/components/App.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';
import { publicUrl } from '@/helpers/publicUrl.ts';
import { ViewportHeightProvider } from '@/veiwPortContext';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import {ThemeProvider as NextThemesProvider} from "next-themes";
import FontHandller from './FontHandller';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ar from '../locales/ar.json';
import fa from '../locales/fa.json';
import { useEffect } from 'react';



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
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' || currentLang === 'fa' ? 'rtl' : 'ltr';
    FontHandller()
  }, [i18n.language]);
  
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
