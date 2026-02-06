"use client";

import { useMemo } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from "recharts";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
}

interface InsightsClientViewProps {
  transactions: Transaction[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

export default function InsightsClientView({ transactions }: InsightsClientViewProps) {
  
  // 1. Income vs Expense
  const incomeVsExpenseData = useMemo(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach(t => {
      if (t.amount > 0) income += t.amount;
      else expense += Math.abs(t.amount);
    });
    return [
      { name: "Income", value: income },
      { name: "Expense", value: expense }
    ];
  }, [transactions]);

  // 2. Category Breakdown (Expenses only usually)
  const categoryData = useMemo(() => {
    const categories: Record<string, number> = {};
    transactions.forEach(t => {
      if (t.amount < 0) {
        const cat = t.category;
        categories[cat] = (categories[cat] || 0) + Math.abs(t.amount);
      }
    });
    return Object.keys(categories).map(key => ({
      name: key,
      value: categories[key]
    })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  // 3. Monthly Trend (Last 6 months maybe, or just daily if few data)
  const trendData = useMemo(() => {
    // Group by Date (YYYY-MM-DD) or Month (YYYY-MM)
    // Let's do daily for now as data might be sparse
    const daily: Record<string, { date: string, income: number, expense: number }> = {};
    
    // Sort transactions by date asc
    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    sorted.forEach(t => {
      const dateKey = format(new Date(t.date), "MMM d");
      if (!daily[dateKey]) {
        daily[dateKey] = { date: dateKey, income: 0, expense: 0 };
      }
      if (t.amount > 0) daily[dateKey].income += t.amount;
      else daily[dateKey].expense += Math.abs(t.amount);
    });

    return Object.values(daily);
  }, [transactions]);

  if (transactions.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
            <h2 className="text-2xl font-bold mb-2">No Insights Yet</h2>
            <p className="text-muted-foreground mb-6">Start adding transactions to see your financial analytics here.</p>
        </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border rounded-xl p-3 shadow-xl">
          <p className="font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 pb-8">
      <h1 className="text-3xl font-bold">Financial Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income vs Expense Pie */}
        <div className="glass-panel p-6 rounded-3xl">
          <h3 className="text-lg font-bold mb-6">Income vs Expense</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incomeVsExpenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell key="cell-income" fill="#22c55e" /> {/* Green for Income */}
                  <Cell key="cell-expense" fill="#ef4444" /> {/* Red for Expense */}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Bar */}
        <div className="glass-panel p-6 rounded-3xl">
          <h3 className="text-lg font-bold mb-6">Expense Categories</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.3} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                <RechartsTooltip cursor={{fill: 'transparent'}} content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trend Line/Bar */}
        <div className="md:col-span-2 glass-panel p-6 rounded-3xl">
          <h3 className="text-lg font-bold mb-6">Transaction History</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="date" />
                <YAxis />
                <RechartsTooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
