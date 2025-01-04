import useViewportHeight from '@/hooks/useViewPortHook';
import { motion } from "framer-motion"

const MobileApp = ({children}) => {
  const viewportHeight = useViewportHeight();

  return (
    <motion.div style={{overflowX:"hidden",overflowY:"auto", backgroundColor:"red"}} animate={{height:`${viewportHeight}px`}} className='fixed w-screen left-0 top-0 right-0 bottom-0' id="wrap">
      <motion.div style={{backgroundColor:"green"}} className='relative' id="content" animate={{height:`${viewportHeight}px`}}>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default MobileApp;
