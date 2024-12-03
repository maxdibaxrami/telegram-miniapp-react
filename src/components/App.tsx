import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { Route, Routes, HashRouter } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { postEvent } from '@telegram-apps/sdk';

import { routes } from '@/navigation/routes.tsx';
import { useEffect } from 'react';


export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  postEvent('web_app_set_header_color', { color_key: 'bg_color' });

  useEffect(()=>{
    const element = document.documentElement; // You can target a specific element
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) { /* Safari */
        (element as any).webkitRequestFullscreen();
      } else if ((element as any).msRequestFullscreen) { /* IE11 */
        (element as any).msRequestFullscreen();
      }
  },[])
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
