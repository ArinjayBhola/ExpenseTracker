"use client";

import { useState } from "react";
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
import { ConfirmModal } from "@/components/modals/ConfirmModal";

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
  
  // Confirmation State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // This is a simplified client-side filter for the fetched data.
  // For large datasets, we would trigger router.push with searchParams.
  const filteredTransactions = initialTransactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    setLoadingId(deleteId);
    try {
      const result = await deleteTransaction(deleteId);
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
      setDeleteId(null);
      setIsConfirmOpen(false);
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
    <div className="space-y-6 px-8 py-8 max-w-7xl mx-auto">
      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Transaction"
        description="Are you sure you want to delete this transaction? This action cannot be undone."
        loading={!!loadingId}
      />
      <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
        <div>
           <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
           <p className="text-muted-foreground text-sm mt-1">Manage and track your financial activity.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-md shadow-sm h-10 px-4 font-medium">
              <Plus size={18} className="mr-2" /> Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-lg bg-card border-border">
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
            </DialogHeader>
            <TransactionForm onSuccess={handleTransactionAdded} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="card-classic p-4 flex flex-col md:flex-row gap-4 items-center bg-card">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input 
            placeholder="Search by title..." 
            className="pl-9 bg-background border-border h-10 w-full focus:ring-1 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-background border-border h-10">
                    <div className="flex items-center text-foreground">
                        <Filter size={14} className="mr-2 text-muted-foreground" />
                        <SelectValue placeholder="All Categories" />
                    </div>
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                    <SelectItem value="Transportation">Transportation</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Salary">Salary</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>

      <div className="card-classic overflow-hidden">
         <table className="table-clean">
            <thead>
               <tr className="bg-secondary/40">
                  <th className="w-16 pl-6 py-3">Type</th>
                  <th className="py-3">Description</th>
                  <th className="py-3">Category</th>
                  <th className="py-3">Date</th>
                  <th className="text-right pr-6 py-3">Amount</th>
                  <th className="w-16"></th>
               </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-secondary/30 transition-colors group">
                  <td className="pl-6 py-4">
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${t.amount > 0 ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
                        <BadgeIndianRupee size={14} />
                     </div>
                  </td>
                  <td className="py-4 font-medium text-foreground">{t.title}</td>
                  <td className="py-4">
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
                        {t.category}
                     </span>
                  </td>
                  <td className="py-4 text-sm text-muted-foreground">{format(new Date(t.date), "MMM d, yyyy")}</td>
                  <td className="text-right pr-6 py-4">
                     <span className={`font-semibold ${t.amount > 0 ? 'text-emerald-700' : 'text-foreground'}`}>
                        {t.amount > 0 ? '+' : ''}{formatCurrency(t.amount)}
                     </span>
                  </td>
                  <td className="py-4 pr-4 text-right">
                     <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
                        onClick={() => confirmDelete(t.id)}
                        disabled={loadingId === t.id}
                    >
                        {loadingId === t.id ? <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" /> : <Trash2 size={14} />}
                    </Button>
                  </td>
                </tr>
              )) : (
                  <tr>
                     <td colSpan={6} className="text-center py-20 text-muted-foreground">
                        <div className="flex flex-col items-center justify-center gap-2">
                           <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                              <Search size={20} className="opacity-50" />
                           </div>
                           <p className="font-medium">No transactions found</p>
                           <p className="text-xs">Try adjusting your filters or search terms.</p>
                        </div>
                     </td>
                  </tr>
              )}
            </tbody>
         </table>
      </div>
    </div>
  );
}
