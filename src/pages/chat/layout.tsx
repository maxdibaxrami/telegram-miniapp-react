import { useViewportHeightContext } from "@/veiwPortContext";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const vp = useViewportHeightContext()  

  return (
    <section 
      className='bg-background'
      style={{
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
