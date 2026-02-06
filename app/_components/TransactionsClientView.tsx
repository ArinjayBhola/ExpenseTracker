"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { BadgeIndianRupee, Search, Plus, Filter, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteTransaction } from "@/app/actions/transactions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TransactionForm from "./TransactionForm";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
}

interface TransactionsClientViewProps {
  initialTransactions: Transaction[];
}

export default function TransactionsClientView({ initialTransactions }: TransactionsClientViewProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // This is a simplified client-side filter for the fetched data.
  // For large datasets, we would trigger router.push with searchParams.
  const filteredTransactions = initialTransactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    
    setLoadingId(id);
    try {
      const result = await deleteTransaction(id);
      if (result.success) {
        toast.success("Transaction deleted");
        router.refresh();
      } else {
        toast.error("Failed to delete");
      }
    } catch (e) {
      toast.error("Error deleting");
    } finally {
      setLoadingId(null);
    }
  };

  const handleTransactionAdded = () => {
    setIsDialogOpen(false);
    router.refresh();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className="text-2xl font-bold">My Transactions</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="premium-gradient text-white rounded-xl shadow-lg shadow-primary/20">
              <Plus size={18} className="mr-2" /> Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
            </DialogHeader>
            <TransactionForm onSuccess={handleTransactionAdded} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-background/50 p-4 rounded-2xl border border-border/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input 
            placeholder="Search by title..." 
            className="pl-9 bg-secondary border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-secondary border-none">
                    <div className="flex items-center text-muted-foreground">
                        <Filter size={16} className="mr-2" />
                        <SelectValue placeholder="All Categories" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                    <SelectItem value="Transportation">Transportation</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Salary">Salary</SelectItem>
                    {/* Add more as needed */}
                </SelectContent>
            </Select>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTransactions.length > 0 ? filteredTransactions.map((t) => (
          <div key={t.id} className="glass-panel p-4 rounded-2xl flex items-center gap-4 group hover:border-primary/30 transition-all">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${t.amount > 0 ? 'bg-green-100 text-green-600 dark:bg-green-900/20' : 'bg-red-100 text-red-600 dark:bg-red-900/20'}`}>
               <BadgeIndianRupee size={20} />
            </div>
            
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold">{t.title}</h3>
                        <p className="text-xs text-muted-foreground">{t.category} • {format(new Date(t.date), "MMM d, yyyy")}</p>
                    </div>
                    <div className="text-right">
                        <p className={`font-bold ${t.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {t.amount > 0 ? '+' : ''}{formatCurrency(t.amount)}
                        </p>
                    </div>
                </div>
            </div>

            <Button 
                variant="ghost" 
                size="icon" 
                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-500 ml-2"
                onClick={() => handleDelete(t.id)}
                disabled={loadingId === t.id}
            >
                {loadingId === t.id ? <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" /> : <Trash2 size={16} />}
            </Button>
          </div>
        )) : (
            <div className="text-center py-20 text-muted-foreground">
                <p>No transactions found matching your filters.</p>
            </div>
        )}
      </div>
    </div>
  );
}
