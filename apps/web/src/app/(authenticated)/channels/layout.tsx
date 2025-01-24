import MainSidebar from './MainSidebar';
import ServerList from './ServerList';

export default function ChannelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <ServerList />
      <MainSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
