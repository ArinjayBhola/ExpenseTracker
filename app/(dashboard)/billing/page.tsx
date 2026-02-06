
import { auth } from "@/auth";
import { getBillingInfo } from "@/app/actions/billing";
import BillingClientView from "@/app/_components/BillingClientView";
import { PLANS } from "@/lib/plans";

export default async function BillingPage() {
  const session = await auth();
  
  if (!session?.user) {
     return <div>Unauthorized</div>
  }

  const data = await getBillingInfo();

  if (data.error) {
    return <div className="p-8 text-red-500">Failed to load billing info.</div>;
  }
  
  // Default to FREE if something fails or is missing
  const billingInfo = {
    plan: data.plan || "FREE",
    usage: data.usage || { transactions: 0, workspaces: 0, reports: 0 }
  };

  return (
    <div className="py-4">
      <BillingClientView billingInfo={billingInfo} />
    </div>
  );
}