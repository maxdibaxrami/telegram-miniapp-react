import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { NextUIProvider } from "@nextui-org/react";
import { App } from '@/components/App.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';
import { publicUrl } from '@/helpers/publicUrl.ts';
import { ViewportHeightProvider } from '@/veiwPortContext';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import FontHandller from './FontHandller';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ar from '../locales/ar.json';
import fa from '../locales/fa.json';
import { useEffect, useState } from 'react';
import { cloudStorage } from '@telegram-apps/sdk'; // Assuming you are using the Telegram SDK

// Function to get the stored language from cloud storage or localStorage
const GetStoredLanguage = async () => {
  if (cloudStorage.isSupported()) {
    const storedLang = await cloudStorage.getItem('lang');
    return storedLang || 'en'; // Default to 'en' if no stored language
  } else {
    return localStorage.getItem('lang') || 'en'; // Fallback to localStorage and default to 'en'
  }
};

// Initialize i18next dynamically based on stored language
const initI18n = async () => {
  const storedLanguage = await GetStoredLanguage(); // Get the stored language

  i18next
    .use(initReactI18next) // Passes i18n down to react-i18next
    .init({
      resources: {
        en: { translation: en },
        ru: { translation: ru },
        ar: { translation: ar },
        fa: { translation: fa },
      },
      lng: storedLanguage, // Set the default language to the stored language
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
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true); // Track if i18next is initialized

  useEffect(() => {
    const loadI18n = async () => {
      await initI18n(); // Wait for i18n to initialize
      setIsLoading(false); // Set loading to false once initialization is complete
    };

    loadI18n();
  }, []);

  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' || currentLang === 'fa' ? 'rtl' : 'ltr';
    FontHandller();
  }, [i18n.language]);

  // Prevent rendering the app before i18next is initialized
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loading screen
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
