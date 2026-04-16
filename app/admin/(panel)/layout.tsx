import { AdminShell } from "@/components/admin/panel/AdminShell";

export default function AdminPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminShell>{children}</AdminShell>;
}
