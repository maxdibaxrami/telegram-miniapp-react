export default function EditProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section style={{marginTop:"50px"}} className="flex flex-col items-center justify-center gap-4 light-background--color">
      {children}
    </section>
  );
}
