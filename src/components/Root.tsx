import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { NextUIProvider } from "@nextui-org/react";
import { App } from '@/components/App.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';
import { publicUrl } from '@/helpers/publicUrl.ts';
import { ViewportHeightProvider } from '@/veiwPortContext';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import FontHandller from './FontHandller';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ar from '../locales/ar.json';
import fa from '../locales/fa.json';
import { useEffect, useState } from 'react';
import { cloudStorage } from '@telegram-apps/sdk';

const GetStoredLanguage = async () => {
  if (cloudStorage.isSupported()) {
    const storedLang = await cloudStorage.getItem('lang');
    return storedLang || 'en'; // Default to 'en' if no stored language
  } else {
    return localStorage.getItem('lang') || 'en'; // Fallback to localStorage and default to 'en'
  }
};

const initializeI18n = async () => {
  const storedLanguage = await GetStoredLanguage();
  
  await i18next
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        ru: { translation: ru },
        ar: { translation: ar },
        fa: { translation: fa },
      },
      lng: storedLanguage, // Set the default language
      fallbackLng: 'en', // Fallback to English if no matching translation is found
      interpolation: {
        escapeValue: false, // React already does escaping
      },
    });
};

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadI18n = async () => {
      await initializeI18n();
      setIsLoading(false);
    };

    loadI18n();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const currentLang = i18next.language;
      document.documentElement.lang = currentLang;
      document.documentElement.dir = currentLang === 'ar' || currentLang === 'fa' ? 'rtl' : 'ltr';
      FontHandller();
    }
  }, [isLoading, i18next.language]); // Include both isLoading and language change as dependencies

  if (isLoading) {
    return <div>Loading...</div>; // Show loading screen until i18next is ready
  }

  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <ViewportHeightProvider>
        <NextUIProvider>
          <TonConnectUIProvider manifestUrl={publicUrl('tonconnect-manifest.json')}>
            <NextThemesProvider attribute="class" defaultTheme="dark">
              <I18nextProvider i18n={i18next}>
                <App />
              </I18nextProvider>
            </NextThemesProvider>
          </TonConnectUIProvider>
        </NextUIProvider>
      </ViewportHeightProvider>
    </ErrorBoundary>
  );
}
