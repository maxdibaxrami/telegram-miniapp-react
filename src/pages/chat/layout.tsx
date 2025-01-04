//import { useViewportHeightContext } from '@/veiwPortContext';

import useViewportHeight from "@/hooks/useViewPortHook";


export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const height = useViewportHeight()

  //const viewportHeight = useViewportHeightContext();
  return (
    <section 
        className='bg-default-100'
        style={{
          height:`${height}px`,
          transition: 'height 0.3s ease',
          display: 'flex',
          paddingBottom:"2rem",
          position:"relative",
          flexDirection: 'column',
        }}
        >            
      {children}
    </section>
  );
}