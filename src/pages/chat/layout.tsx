//import { useViewportHeightContext } from '@/veiwPortContext';


export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  //const viewportHeight = useViewportHeightContext();
  return (
    <section 
        className='bg-background'
        style={{
          height: `calc(100vh)`,
          transition: 'height 0.3s ease',
          overflow: 'hidden',
          display: 'flex',
          paddingBottom:"4rem",
          position:"relative",
          flexDirection: 'column',
        }}
        >            
      {children}
    </section>
  );
}