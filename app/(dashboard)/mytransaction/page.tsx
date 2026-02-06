
import { auth } from "@/auth";
import { getUserTransactions } from "@/app/actions/transactions";
import TransactionsClientView from "@/app/_components/TransactionsClientView";

export default async function MyTransactionsPage() {
  const session = await auth();
  
  // Initially fetch recent 50 transactions
  const { transactions, error } = await getUserTransactions();

  if (error) {
    return <div className="p-8 text-red-500">Failed to load transactions.</div>;
  }

  return (
    <div className="py-4 space-y-8">
      <TransactionsClientView initialTransactions={transactions || []} />
    </div>
  );
}
