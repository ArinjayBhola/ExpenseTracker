"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
  category: string;
  amount: number;
  type: string;
  date: string;
};

function TransactionForm() {
  const [userId, setUserId] = useState<string>("");
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (!email) return;
    axios
      .post("api/get-user", {
        email: email,
      })
      .then((response) => {
        setUserId(response.data.message);
      })
      .catch((error) => console.error(error));
  }, [email]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post("/api/add-transaction", {
        category: data.category,
        amount: data.amount,
        userId: userId,
      });
      if (response.data.message === "Transaction added") {
        toast.success("Transaction added successfully");
      } else {
        throw new Error("An error occurred");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 border rounded-xl bg-white shadow-lg max-w-lg mx-auto">
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <Select
          {...register("category", {
            required: "Category is required",
          })}
          onValueChange={(value) => setValue("category", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Income">Income</SelectItem>
            <SelectItem value="Expense">Expense</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>}
      </div>

      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          id="amount"
          {...register("amount", {
            required: "Amount is required",
            valueAsNumber: true,
            min: { value: 1, message: "Amount must be greater than zero" },
          })}
          placeholder="Enter amount"
          type="number"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount.message}</p>}
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
          Add Transaction
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
