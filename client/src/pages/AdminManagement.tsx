import { useState, useMemo } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Shield, Search, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { Link } from "wouter";

export default function AdminManagement() {
  const { user, isAuthenticated, loading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [addAdminForm, setAddAdminForm] = useState({ email: "", name: "" });

  // Fetch all users
  const { data: users = [], isLoading: usersLoading, refetch } = trpc.users.list.useQuery({
    search: searchQuery || undefined,
  });

  // Mutations
  const promoteToAdmin = trpc.users.promoteToAdmin.useMutation({
    onSuccess: () => {
      toast.success("User promoted to admin");
      refetch();
    },
    onError: (e) => {
      toast.error("Failed to promote user: " + e.message);
    },
  });

  const demoteFromAdmin = trpc.users.demoteFromAdmin.useMutation({
    onSuccess: () => {
      toast.success("User demoted from admin");
      refetch();
    },
    onError: (e) => {
      toast.error("Failed to demote user: " + e.message);
    },
  });

  const createAdmin = trpc.users.createAdmin.useMutation({
    onSuccess: () => {
      toast.success("Admin created successfully");
      setAddAdminForm({ email: "", name: "" });
      setShowAddAdmin(false);
      refetch();
    },
    onError: (e) => {
      toast.error("Failed to create admin: " + e.message);
    },
  });

  const handleAddAdmin = () => {
    if (!addAdminForm.email) {
      toast.error("Please enter an email address");
      return;
    }
    createAdmin.mutate({ email: addAdminForm.email, name: addAdminForm.name || undefined });
  };

  // Check if user is owner by checking if they're an admin (owner is always admin)
  // The server ensures only the owner can access owner-only procedures
  const isOwner = user?.role === "admin" && user?.openId !== undefined;

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[oklch(73%_0.14_72)]" />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[oklch(13%_0.04_255)] mb-2">Sign In Required</h2>
            <p className="text-[oklch(55%_0.04_255)] mb-4">Please sign in to manage admins.</p>
            <a href={`${import.meta.env.VITE_OAUTH_PORTAL_URL}?app_id=${import.meta.env.VITE_APP_ID}&redirect_uri=${window.location.origin}`} className="inline-block px-4 py-2 bg-[oklch(73%_0.14_72)] text-white rounded-lg hover:bg-[oklch(65%_0.12_72)] transition">
              Sign In
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isOwner) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[oklch(13%_0.04_255)] mb-2">Access Denied</h2>
            <p className="text-[oklch(55%_0.04_255)]">Only the owner can manage admins.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const admins = users.filter((u) => u.role === "admin");
  const nonAdmins = users.filter((u) => u.role === "user");

  return (
    <Layout>
      <div className="min-h-screen bg-[oklch(97%_0.012_80)]">
        {/* Header */}
        <div className="bg-white border-b border-[oklch(88%_0.025_80)] sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <button className="flex items-center gap-2 px-3 py-2 text-[oklch(55%_0.04_255)] hover:text-[oklch(13%_0.04_255)] transition">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Admin
                </button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-[oklch(13%_0.04_255)]" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Admin Management
                </h1>
                <p className="text-[oklch(55%_0.04_255)] text-sm mt-1">Promote or demote users to admin status</p>
              </div>
            </div>
            <Shield className="w-8 h-8 text-[oklch(73%_0.14_72)]" />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Add Admin Section */}
          <div className="mb-8">
            <button
              onClick={() => setShowAddAdmin(!showAddAdmin)}
              className="px-4 py-2 bg-[oklch(73%_0.14_72)] text-white rounded-lg hover:bg-[oklch(65%_0.12_72)] transition"
            >
              {showAddAdmin ? "Cancel" : "+ Add New Admin"}
            </button>
            {showAddAdmin && (
              <div className="mt-4 bg-white rounded-lg border border-[oklch(88%_0.025_80)] p-6 space-y-4">
                <h3 className="font-semibold text-[oklch(13%_0.04_255)]">Create New Admin</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[oklch(13%_0.04_255)] mb-2 block">Email *</Label>
                    <Input
                      type="email"
                      placeholder="admin@example.com"
                      value={addAdminForm.email}
                      onChange={(e) => setAddAdminForm({ ...addAdminForm, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-[oklch(13%_0.04_255)] mb-2 block">Name (Optional)</Label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={addAdminForm.name}
                      onChange={(e) => setAddAdminForm({ ...addAdminForm, name: e.target.value })}
                    />
                  </div>
                </div>
                <Button
                  onClick={handleAddAdmin}
                  disabled={createAdmin.isPending}
                  className="bg-[oklch(73%_0.14_72)] hover:bg-[oklch(65%_0.12_72)]"
                >
                  {createAdmin.isPending ? "Creating..." : "Create Admin"}
                </Button>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <Label className="text-[oklch(13%_0.04_255)] font-semibold mb-2 block">Search Users</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-[oklch(55%_0.04_255)]" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Current Admins */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[oklch(13%_0.04_255)] mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Current Admins ({admins.length})
            </h2>
            {admins.length === 0 ? (
              <div className="bg-white rounded-lg border border-[oklch(88%_0.025_80)] p-6 text-center text-[oklch(55%_0.04_255)]">
                No admins found
              </div>
            ) : (
              <div className="space-y-3">
                {admins.map((u) => (
                  <div key={u.id} className="bg-white rounded-lg border border-[oklch(88%_0.025_80)] p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[oklch(13%_0.04_255)]">{u.name || "Unknown"}</p>
                      <p className="text-sm text-[oklch(55%_0.04_255)]">{u.email}</p>
                    </div>
                    <Button
                      onClick={() => demoteFromAdmin.mutate({ userId: u.id })}
                      disabled={demoteFromAdmin.isPending}
                      variant="outline"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      {demoteFromAdmin.isPending ? "Demoting..." : "Demote"}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Non-Admin Users */}
          <div>
            <h2 className="text-2xl font-bold text-[oklch(13%_0.04_255)] mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Users ({nonAdmins.length})
            </h2>
            {nonAdmins.length === 0 ? (
              <div className="bg-white rounded-lg border border-[oklch(88%_0.025_80)] p-6 text-center text-[oklch(55%_0.04_255)]">
                No users found
              </div>
            ) : (
              <div className="space-y-3">
                {nonAdmins.map((u) => (
                  <div key={u.id} className="bg-white rounded-lg border border-[oklch(88%_0.025_80)] p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[oklch(13%_0.04_255)]">{u.name || "Unknown"}</p>
                      <p className="text-sm text-[oklch(55%_0.04_255)]">{u.email}</p>
                    </div>
                    <Button
                      onClick={() => promoteToAdmin.mutate({ userId: u.id })}
                      disabled={promoteToAdmin.isPending}
                      className="bg-[oklch(73%_0.14_72)] hover:bg-[oklch(65%_0.12_72)]"
                    >
                      {promoteToAdmin.isPending ? "Promoting..." : "Promote to Admin"}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
