export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen">
      {/* Add sidebar and other layout elements here */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
