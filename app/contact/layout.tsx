export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <title>Contact Us</title>
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        {children}
      </div>
    </>
  );
}
