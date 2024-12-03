import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { Route, Routes, HashRouter } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { routes } from '@/navigation/routes.tsx';


export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      style={{overflow:"hidden"}}
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
