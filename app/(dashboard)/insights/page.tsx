
import { auth } from "@/auth";
import { getUserTransactions } from "@/app/actions/transactions";
import InsightsClientView from "@/app/_components/InsightsClientView";

export default async function InsightsPage() {
  const session = await auth();
  
  // Fetch more transactions for better insights, e.g., 200
  // Note: getUserTransactions has a limit of 50 currently. 
  // Ideally we would add a 'limit' parameter to the action or create a specialized 'getAllTransactions' for stats.
  // For now, 50 is okay for testing, but let's assume update to action or accept it.
  
  const { transactions, error } = await getUserTransactions();

  if (error) {
    return <div className="p-8 text-red-500">Failed to load insights data.</div>;
  }

  return (
    <div className="py-4">
      <InsightsClientView transactions={transactions || []} />
    </div>
  );
}
