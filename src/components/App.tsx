import { useEffect, useState } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLaunchParams, miniApp, useSignal, initData } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { motion, AnimatePresence } from 'framer-motion';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import { fetchUserData } from '../features/userSlice';
import { RootState, AppDispatch } from '../store';
import {routes} from '@/navigation/routes.tsx';
import FontHandller from './FontHandller';
import Loading from '@/components/spinner/loading';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ar from '../locales/ar.json';
import fa from '../locales/fa.json';
import { fetchLikes } from '@/features/likeSlice';
import { fetchMatches } from '@/features/matchSlice';
import { fetchFilteredExplore } from '@/features/exploreSlice';
import { fetchConversations } from '@/features/conversationsSlice';
import { Toaster } from 'react-hot-toast';
import { fetchNearBySliceUsers, setFilters } from '@/features/nearBySlice';

const GetStoredLanguage = async () => {
  try {
    const cloudStorage = (await import('@telegram-apps/sdk')).cloudStorage;
    if (cloudStorage.isSupported()) {
      const storedLang = await cloudStorage.getItem('lang');
      return storedLang || 'en';
    }
  } catch (error) {
    console.warn('Cloud storage not supported:', error);
  }
  return localStorage.getItem('lang') || 'en';
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
      lng: storedLanguage,
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
    });
};

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const initDataState = useSignal(initData.state);
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetchedDetails, setHasFetchedDetails] = useState(false);
  
  useEffect(() => {
    // Dispatch fetchUserData only once with the initial hash
    console.log(initDataState.hash);
    dispatch(fetchUserData(initDataState.hash));
  }, [dispatch, initDataState.hash]);

  useEffect(() => {
    // Once user data is loaded, dispatch the secondary fetches only once
    if (data && data.id && !hasFetchedDetails) {

      setHasFetchedDetails(true);

      const updatedFilters = {
        ageRange: null,
        city: null,
        country: null,
        languages: null,
        genderFilter: data.gender === "male" ? "male" : "female",
      };
      // Dispatch filters to Redux store
      dispatch(setFilters(updatedFilters));

      const userId = data.id.toString();
      console.log("123321")
      dispatch(fetchLikes(userId));
      dispatch(fetchMatches(userId));
      dispatch(fetchConversations(userId));
      dispatch(fetchFilteredExplore({
        userId: userId,  // Replace with actual user ID
        page: 1,
        limit: 10,
        
      }));

      dispatch(fetchNearBySliceUsers({
        userId: data.id.toString(),
        page: 1,
        limit: 20,
        genderFilter: updatedFilters.genderFilter,
        ...updatedFilters, // Using updatedFilters directly
      }));

    }
  }, [data]);

  useEffect(() => {
    const loadI18n = async () => {
      await initializeI18n();
      const currentLang = i18next.language;
      document.documentElement.lang = currentLang;
      document.documentElement.dir = ['ar', 'fa'].includes(currentLang) ? 'rtl' : 'ltr';
      FontHandller();

    };
    loadI18n();
    FontHandller();

    setIsLoading(false)
    
  }, [i18next]);

  if(isLoading || loading){
    return <Loading/>
  }

  return (
    <I18nextProvider i18n={i18next}>
      <AppRoot appearance={isDark ? 'dark' : 'light'} platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}>
        <HashRouter>
          <AnimatePresence>
            <Routes>
              {routes.filter(route => route.auth === !!data).map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                    >
                      <route.Component />
                    </motion.div>
                  }
                />
              ))}

            <Route
              path="*"
              element={data ? <Navigate to="/main?page=profile" replace /> : <Navigate to="/sign-up" replace />}
            />
            
            </Routes>
          </AnimatePresence>
        </HashRouter>
        <Toaster />
      </AppRoot>
    </I18nextProvider>
  );
}
