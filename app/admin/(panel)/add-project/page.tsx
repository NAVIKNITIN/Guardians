import { AddProjectWizard } from "@/components/admin/projects/AddProjectWizard";
import { Suspense } from "react";

export default function AddProjectPage() {
  return (
    <Suspense fallback={null}>
      <AddProjectWizard />
    </Suspense>
  );
}
