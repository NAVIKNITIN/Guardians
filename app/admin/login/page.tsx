import { AdminLoginPage } from "@/components/admin/AdminLoginPage";
import { PublicRoute } from "@/src/routes/PublicRoute";

export default function Page() {
  return (
    <PublicRoute>
      <AdminLoginPage />
    </PublicRoute>
  );
}
