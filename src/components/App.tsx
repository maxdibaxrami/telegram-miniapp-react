import { Route, Routes, HashRouter } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { routes } from '@/navigation/routes.tsx';


export function App() {

  return (
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
  );
}
