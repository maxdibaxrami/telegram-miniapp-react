
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  
  return (
    <section 
      className='bg-background'
      style={{
        maxHeight:'var(--tg-viewport-stable-height)',
        minHeight: 'var(--tg-viewport-stable-height)', // Ensures it takes full height of the parent
        height: 'var(--tg-viewport-stable-height)',    // Sets height to 100% of parent
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
