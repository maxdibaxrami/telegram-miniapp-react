
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  
  return (
    <section 
      className='bg-background'
      style={{
        minHeight: '100vh', // Ensures it takes full height of the parent
        height: '100%',    // Sets height to 100% of parent
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
