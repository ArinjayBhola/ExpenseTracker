
import { auth } from "@/auth";
import SettingsClientView from "@/app/_components/SettingsClientView";

export default async function SettingsPage() {
  const session = await auth();
  
  if (!session?.user) {
     return <div>Unauthorized</div>
  }

  const userData = {
      id: session.user.id || "",
      name: session.user.name || "",
      email: session.user.email || ""
  };

  return (
    <div className="py-4">
      <SettingsClientView user={userData} />
    </div>
  );
}