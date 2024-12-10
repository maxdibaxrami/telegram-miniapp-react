import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { Route, Routes, HashRouter } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { routes } from '@/navigation/routes.tsx';
import { useEffect } from 'react';
import FontHandller from './FontHandller';
import { useTranslation } from 'react-i18next';


export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const { i18n } = useTranslation();

  useEffect(() => {
      const currentLang = i18n.language;
      document.documentElement.lang = currentLang;
      document.documentElement.dir = currentLang === 'ar' || currentLang === 'fa' ? 'rtl' : 'ltr';
      FontHandller();
  }, [i18n.language]); // Include both isLoading and language change as dependencies

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
      
      
    >
      <HashRouter>
        <AnimatePresence>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                {...route}
                element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <route.Component/>
                  </motion.div>
                }
              />
            ))}
          </Routes>
        </AnimatePresence>
      </HashRouter>
    </AppRoot>
  );
}
