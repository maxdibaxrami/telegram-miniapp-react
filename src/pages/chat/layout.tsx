export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-screen ">
      {children}
    </section>
  );
}
