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
          height: `calc(100vh - 40px)`,
          transition: 'height 0.3s ease',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        >            
      {children}
    </section>
  );
}
