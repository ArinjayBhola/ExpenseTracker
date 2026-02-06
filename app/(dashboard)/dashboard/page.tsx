
import { auth } from "@/auth";
import { getDashboardStats } from "@/app/actions/dashboard";
import { BadgeIndianRupee, TrendingUp, TrendingDown, Wallet, CreditCard } from "lucide-react";
import { format } from "date-fns";

export default async function DashboardPage() {
  const session = await auth();
  const { stats, recentTransactions, error } = await getDashboardStats();

  if (error) {
    return (
      <div className="p-8 text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
        Failed to load dashboard data.
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <div className="space-y-8 py-8 px-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Good Morning, {session?.user?.name || "User"}
        </h1>
        <p className="text-muted-foreground text-base">
          Here is your financial overview for {format(new Date(), "MMMM d, yyyy")}.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { 
            label: "Total Balance", 
            value: formatCurrency(stats?.totalBalance || 0), 
            icon: Wallet, 
            trend: "Updated just now", 
            color: "text-primary",
            bg: "bg-primary/10"
          },
          { 
            label: "Total Income", 
            value: formatCurrency(stats?.income || 0), 
            icon: TrendingUp, 
            trend: "This Month", 
            color: "text-emerald-700",
            bg: "bg-emerald-50"
          },
          { 
            label: "Total Expenses", 
            value: formatCurrency(stats?.expenses || 0), 
            icon: TrendingDown, 
            trend: "This Month", 
            color: "text-red-700",
            bg: "bg-red-50"
          },
          { 
            label: "Current Plan", 
            value: "Enterprise", 
            icon: CreditCard, 
            trend: "Active user", 
            color: "text-blue-700",
            bg: "bg-blue-50"
          },
        ].map((stat, i) => (
          <div key={i} className="card-classic p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        {/* Empty State / Placeholder for Charts */}
        <div className="md:col-span-4 card-classic p-0 flex flex-col min-h-[400px]">
             <div className="p-6 border-b border-border">
                <h3 className="font-semibold text-lg text-foreground">Financial Insights</h3>
                <p className="text-sm text-muted-foreground">Monthly revenue vs expenses</p>
             </div>
             <div className="flex-1 flex flex-col justify-center items-center text-center p-8 bg-secondary/20">
                 <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <TrendingUp className="text-muted-foreground" size={24} />
                 </div>
                 <h4 className="text-foreground font-medium mb-1">No data available yet</h4>
                 <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                    Once you start adding transactions, detailed analytics and charts will appear here.
                 </p>
             </div>
        </div>
        
        {/* Recent Transactions List */}
        <div className="md:col-span-3 card-classic p-0 flex flex-col">
             <div className="p-6 border-b border-border flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-lg text-foreground">Recent Transactions</h3>
                    <p className="text-sm text-muted-foreground">Latest financial activity</p>
                </div>
                <a href="/mytransaction" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    View All
                </a>
             </div>
             
             <div className="p-0">
                {recentTransactions && recentTransactions.length > 0 ? (
                    <table className="table-clean">
                        <tbody>
                        {recentTransactions.map((t:any) => (
                            <tr key={t.id} className="hover:bg-secondary/30 transition-colors cursor-default">
                                <td className="w-12 pl-6">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        t.amount > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        <BadgeIndianRupee size={16} />
                                    </div>
                                </td>
                                <td>
                                    <div className="font-medium text-sm text-foreground">{t.title}</div>
                                    <div className="text-xs text-muted-foreground">{format(new Date(t.date), "MMM d, h:mm a")}</div>
                                </td>
                                <td className="text-right pr-6">
                                    <span className={`font-semibold text-sm ${
                                        t.amount > 0 ? 'text-emerald-700' : 'text-foreground'
                                    }`}>
                                        {t.amount > 0 ? '+' : ''}{formatCurrency(t.amount)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-12 text-muted-foreground text-sm">
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
