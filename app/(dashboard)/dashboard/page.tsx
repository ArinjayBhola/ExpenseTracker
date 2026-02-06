
import { auth } from "@/auth";
import { getDashboardStats } from "@/app/actions/dashboard";
import { BadgeIndianRupee, TrendingUp, TrendingDown, Wallet, CreditCard } from "lucide-react";
import { format } from "date-fns";

export default async function DashboardPage() {
  const session = await auth();
  const { stats, recentTransactions, error } = await getDashboardStats();

  if (error) {
    return <div className="p-8 text-red-500">Failed to load dashboard data.</div>;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <div className="space-y-8 py-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome back, {session?.user?.name || "User"}
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your finances today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { 
            label: "Total Balance", 
            value: formatCurrency(stats?.totalBalance || 0), 
            icon: Wallet, 
            trend: "Updated", 
            trendUp: true, 
            color: "text-blue-600",
            bg: "bg-blue-100 dark:bg-blue-900/20"
          },
          { 
            label: "Income", 
            value: formatCurrency(stats?.income || 0), 
            icon: TrendingUp, 
            trend: "All time", 
            trendUp: true, 
            color: "text-green-600",
            bg: "bg-green-100 dark:bg-green-900/20"
          },
          { 
            label: "Expenses", 
            value: formatCurrency(stats?.expenses || 0), 
            icon: TrendingDown, 
            trend: "All time", 
            trendUp: false, 
            color: "text-red-600",
            bg: "bg-red-100 dark:bg-red-900/20"
          },
          { 
            label: "Subscribed", 
            value: "Free Plan", 
            icon: CreditCard, 
            trend: "Active", 
            trendUp: true, 
            color: "text-indigo-600",
            bg: "bg-indigo-100 dark:bg-indigo-900/20"
          },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-3xl glow-hover group relative overflow-hidden">
             {/* Decorative background blob */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 blur-2xl ${stat.color === 'text-blue-600' ? 'bg-blue-500' : stat.color === 'text-green-600' ? 'bg-green-500' : stat.color === 'text-red-600' ? 'bg-red-500' : 'bg-indigo-500'}`}></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon size={22} />
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-foreground`}>
                {stat.trend}
              </span>
            </div>
            <div className="relative z-10">
              <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4 glass-panel p-8 rounded-3xl min-h-[400px] flex flex-col justify-center items-center text-center space-y-4">
             <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center">
                <TrendingUp className="text-muted-foreground" size={32} />
             </div>
             <div>
                <h3 className="text-lg font-semibold">Financial Insights</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                    Interactive charts and detailed analytics will appear here once you start adding more transactions.
                </p>
             </div>
        </div>
        
        <div className="md:col-span-3 glass-panel p-8 rounded-3xl">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Recent Transactions</h3>
                <a href="/mytransaction" className="text-sm text-primary hover:underline">View All</a>
             </div>
             
             <div className="space-y-4">
                {recentTransactions && recentTransactions.length > 0 ? (
                    recentTransactions.map((t:any) => (
                        <div key={t.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-secondary/50 transition-colors">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${t.amount > 0 ? 'bg-green-100 text-green-600 dark:bg-green-900/20' : 'bg-red-100 text-red-600 dark:bg-red-900/20'}`}>
                                <BadgeIndianRupee size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm truncate">{t.title}</p>
                                <p className="text-xs text-muted-foreground truncate">{format(new Date(t.date), "MMM d, yyyy • h:mm a")}</p>
                            </div>
                            <span className={`font-bold whitespace-nowrap ${t.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {t.amount > 0 ? '+' : ''}{formatCurrency(t.amount)}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-muted-foreground text-sm">
                        No transactions found.
                        <br />
                        <a href="/mytransaction" className="text-primary hover:underline mt-2 inline-block">Add your first one</a>
                    </div>
                )}
             </div>
        </div>
      </div>
    </div>
  );
}
