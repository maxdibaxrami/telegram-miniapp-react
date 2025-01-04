import useViewportHeight from '@/hooks/useViewPortHook';
import { useEffect } from 'react';

const MobileApp = ({children}) => {
  const viewportHeight = useViewportHeight();

  useEffect(() => {
    const wrapElement = document.getElementById('wrap');
    if (wrapElement) {
      wrapElement.style.height = `${viewportHeight}px`;  // Dynamically set height
    }
  }, [viewportHeight]);

  return (
    <div id="wrap">
      <div id="content" style={{ height: '100%' }}>
        {children}
      </div>
    </div>
  );
};

export default MobileApp;
