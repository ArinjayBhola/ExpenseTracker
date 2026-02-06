"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { addTransaction } from "@/app/actions/transactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type Inputs = {
  title: string;
  category: string;
  amount: number;
  type: "Income" | "Expense";
  date: string; // ISO date string from input type="date"
};

interface TransactionFormProps {
  onSuccess?: () => void;
}

const CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Health & Fitness",
  "Education",
  "Personal Care",
  "Travel",
  "Salary",
  "Investment",
  "Other"
];

function TransactionForm({ onSuccess }: TransactionFormProps) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<Inputs>({
    defaultValues: {
      type: "Expense",
      date: new Date().toISOString().split('T')[0]
    }
  });

  const transactionType = watch("type");

  const onSubmit = async (data: Inputs) => {
    setLoading(true);
    try {
      // Adjust amount based on type
      const adjustedAmount = data.type === "Expense" ? -Math.abs(data.amount) : Math.abs(data.amount);

      const result = await addTransaction({
        title: data.title,
        amount: adjustedAmount,
        category: data.category,
        date: new Date(data.date),
      });

      if (result.success) {
        toast.success("Transaction added successfully");
        reset();
        if (onSuccess) onSuccess();
      } else {
        toast.error(result.error || "Failed to add transaction");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <div className="flex bg-secondary rounded-lg p-1">
                <button
                    type="button"
                    className={`flex-1 text-sm py-1.5 rounded-md transition-all ${transactionType === "Income" ? "bg-background shadow text-green-600 font-medium" : "text-muted-foreground hover:text-foreground"}`}
                    onClick={() => setValue("type", "Income")}
                >
                    Income
                </button>
                <button
                    type="button"
                    className={`flex-1 text-sm py-1.5 rounded-md transition-all ${transactionType === "Expense" ? "bg-background shadow text-red-600 font-medium" : "text-muted-foreground hover:text-foreground"}`}
                    onClick={() => setValue("type", "Expense")}
                >
                    Expense
                </button>
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Input 
                type="date" 
                {...register("date", { required: "Date is required" })}
            />
            {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input
          placeholder="e.g. Grocery Shopping"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select onValueChange={(val) => setValue("category", val)}>
                <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="!z-[9999] bg-card border border-border shadow-2xl">
                    {CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <input type="hidden" {...register("category", { required: "Category is required" })} />
            {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                min="0"
                {...register("amount", { required: "Amount is required", min: 0.01 })}
            />
            {errors.amount && <p className="text-xs text-red-500">{errors.amount.message}</p>}
        </div>
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-11" disabled={loading}>
        {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
        Add Transaction
      </Button>
    </form>
  );
}

export default TransactionForm;
