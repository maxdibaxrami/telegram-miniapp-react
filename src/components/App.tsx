import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { Route, Routes, HashRouter } from 'react-router-dom';

import { routes } from '@/navigation/routes.tsx';

export function App() {

  return (
      <HashRouter>
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
        </Routes>
      </HashRouter>
  );
}
