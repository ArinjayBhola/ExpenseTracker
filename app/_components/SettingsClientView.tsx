"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, CreditCard, Bell, Shield, Loader2 } from 'lucide-react';
import { updateProfile } from '@/app/actions/settings';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

interface UserData {
  id: string;
  name: string | null;
  email: string | null;
}

interface SettingsClientViewProps {
  user: UserData;
}

export default function SettingsClientView({ user }: SettingsClientViewProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user.name || "");

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const result = await updateProfile({ name: name });
      if (result.success) {
        toast.success("Profile updated");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update");
      }
    } catch (error) {
       toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                 <label className="text-sm font-medium">Full Name</label>
                 <Input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input value={user.email || ''} disabled className="opacity-50" />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed contact support if needed.
                </p>
              </div>
              <Button onClick={handleSaveProfile} disabled={loading || !name.trim()} className="premium-gradient text-white">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Billing Overview
              </CardTitle>
              <CardDescription>
                Manage your subscription and payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50 border border-border flex items-center justify-between">
                     <span>Manage details in Billing section</span>
                     <Button onClick={() => router.push('/billing')} variant="outline">Go to Billing</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placeholders for other tabs */}
        <TabsContent value="notifications" className="space-y-6">
           <Card className="glass-panel">
             <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
             <CardContent className="text-muted-foreground text-sm">
                Notification preferences are coming soon.
             </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
           <Card className="glass-panel">
             <CardHeader><CardTitle>Security</CardTitle></CardHeader>
             <CardContent className="text-muted-foreground text-sm">
                Security settings are managed by your authentication provider.
             </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
