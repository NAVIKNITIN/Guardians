import { AdminShell } from "@/components/admin/panel/AdminShell";
import { PrivateRoute } from "@/src/routes/PrivateRoute";

export default function AdminPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrivateRoute>
      <AdminShell>{children}</AdminShell>
    </PrivateRoute>
  );
}
