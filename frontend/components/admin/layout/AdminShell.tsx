import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-tfa-background text-tfa-text">
      <AdminSidebar />
      <div className="min-h-screen lg:pl-64">
        <AdminTopbar />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
