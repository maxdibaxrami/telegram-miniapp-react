import useViewportHeight from '@/hooks/useViewPortHook';
import { motion } from "framer-motion"
import { useEffect, useState } from 'react';

const MobileApp = ({children}) => {
  const viewportHeight = useViewportHeight();
  const [keyboardOpen, setKeyBoardOpen] = useState(false)

 
  useEffect(()=>{
    if (window.visualViewport?.height && window.visualViewport.height < window.innerHeight) {
      setKeyBoardOpen(true); // Scroll to the top when keyboard opens
      return
    }
    setKeyBoardOpen(false); // Scroll to the top when keyboard opens

  },[viewportHeight])

  return (
    <motion.div style={{overflowX:"hidden",overflowY:"auto"}} animate={keyboardOpen?{height:`${viewportHeight}px`}:{height:"100vh"}} className='fixed w-screen left-0 top-0 right-0 bottom-0' id="wrap">
      <motion.div className='relative' id="content" animate={keyboardOpen?{height:`${viewportHeight}px`}:{height:"100vh"}}>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default MobileApp;
