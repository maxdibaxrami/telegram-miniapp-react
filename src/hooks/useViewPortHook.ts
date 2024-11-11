import { useState, useEffect } from 'react';

const useViewportHeight = (): number => {
    const [viewportHeight, setViewportHeight] = useState<number>(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setViewportHeight(window.innerHeight);
        };

        document.documentElement.style.transition = 'height 0.3s ease';

        window.visualViewport?.addEventListener('resize', handleResize);
        window.addEventListener('resize', handleResize);

        return () => {
            window.visualViewport?.removeEventListener('resize', handleResize);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return viewportHeight;
};

export default useViewportHeight;
