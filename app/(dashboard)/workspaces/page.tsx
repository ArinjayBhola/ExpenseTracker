
import { auth } from "@/auth";
import { getWorkspaces } from "@/app/actions/workspaces";
import WorkspacesClientView from "@/app/_components/WorkspacesClientView";

export default async function WorkspacesPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return <div>Unauthorized</div>;
  }
  
  const { workspaces, error } = await getWorkspaces();

  if (error) {
    return <div className="p-8 text-red-500">Failed to load workspaces.</div>;
  }

  return (
    <div className="py-4">
      <WorkspacesClientView workspaces={workspaces || []} currentUserId={userId} />
    </div>
  );
}