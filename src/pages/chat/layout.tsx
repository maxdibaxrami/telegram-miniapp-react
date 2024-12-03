
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {

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
