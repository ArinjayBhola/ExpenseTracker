"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Plus, Users, Briefcase, Trash2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createWorkspace, deleteWorkspace } from "@/app/actions/workspaces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ConfirmModal } from "@/components/modals/ConfirmModal";

interface Workspace {
  id: string;
  name: string;
  ownerId: string;
  createdAt: Date;
  _count: { transactions: number };
  owner: { name: string | null; email: string };
  members: any[];
}

interface WorkspacesClientViewProps {
  workspaces: Workspace[];
  currentUserId: string;
}

export default function WorkspacesClientView({ workspaces, currentUserId }: WorkspacesClientViewProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createWorkspace(newWorkspaceName);
      if (result.success) {
        toast.success("Workspace created");
        setNewWorkspaceName("");
        setIsDialogOpen(false);
        router.refresh();
      } else {
        toast.error(result.error || "Failed to create");
      }
    } catch (error) {
       toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id: string) => {
      setDeletingId(id);
      setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    
    try {
        const result = await deleteWorkspace(deletingId);
        if (result.success) {
          toast.success("Workspace deleted");
          router.refresh();
        } else {
          toast.error(result.error || "Failed to delete");
        }
    } catch (e) {
        toast.error("Error deleting workspace");
    } finally {
        setDeletingId(null);
        setIsConfirmOpen(false);
    }
  };

  return (
    <div className="space-y-8">
      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Workspace"
        description="Are you sure you want to delete this workspace and all its data? This action cannot be undone."
        loading={!!deletingId}
      />
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold">Workspaces</h1>
            <p className="text-muted-foreground">Manage your shared financial environments</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-md shadow-sm">
              <Plus size={16} className="mr-2" />
              Create Workspace
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle>Create New Workspace</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 mt-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Workspace Name</label>
                    <Input 
                        placeholder="e.g. My Business, House Expenses" 
                        value={newWorkspaceName}
                        onChange={(e) => setNewWorkspaceName(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={loading}>
                    {loading ? "Creating..." : "Create Workspace"}
                </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspaces.map((ws) => (
            <div key={ws.id} className="card-classic p-6 rounded-xl relative group hover:shadow-md transition-all flex flex-col justify-between h-[220px]">
                <div>
                     <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-secondary rounded-2xl">
                            <Briefcase size={24} className="text-primary" />
                        </div>
                        {ws.ownerId === currentUserId && (
                             <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => confirmDelete(ws.id)}
                                disabled={deletingId === ws.id}
                             >
                                <Trash2 size={18} />
                             </Button>
                        )}
                     </div>
                     <h3 className="text-xl font-bold mb-1">{ws.name}</h3>
                     <p className="text-sm text-muted-foreground flex items-center gap-1">
                        owned by {ws.ownerId === currentUserId ? "You" : ws.owner.name}
                     </p>
                </div>

                <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1"><Users size={14} /> {ws.members?.length || 0}</span>
                        <span>{ws._count?.transactions || 0} txns</span>
                    </div>
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
                        Open <ArrowRight size={14} className="ml-1" />
                    </Button>
                </div>
            </div>
        ))}
        
        {workspaces.length === 0 && (
             <div className="col-span-full text-center py-20 bg-secondary/20 rounded-3xl border border-dashed border-border flex flex-col items-center justify-center">
                <Briefcase size={48} className="text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No workspaces yet</h3>
                <p className="text-muted-foreground max-w-sm mb-6">Create a workspace to organize transactions separately for different projects or groups.</p>
                <Button onClick={() => setIsDialogOpen(true)} variant="outline">Create your first workspace</Button>
             </div>
        )}
      </div>
    </div>
  );
}
