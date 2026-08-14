import { useState, useRef } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { PlusCircle, FileText, Video, Users, TrendingUp, LogOut, Eye, Sparkles, Pencil, Trash2, ExternalLink, UploadCloud, FileUp } from "lucide-react";
import { getLoginUrl } from "@/const";
import Layout from "@/components/Layout";
import { Link } from "wouter";

type Tab = "posts" | "webinars" | "leads" | "ai";

type PostForm = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: "market-news" | "trading-tips" | "options" | "investing" | "portfolio" | "education";
  published: boolean;
  featured: boolean;
  readTime: number;
  metaDescription: string;
  youtubeUrl: string;
};

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

const EMPTY_POST_FORM: PostForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "education",
  published: false,
  featured: false,
  readTime: 5,
  metaDescription: "",
  youtubeUrl: "",
};

const CATEGORIES = [
  { value: "market-news", label: "Market News" },
  { value: "trading-tips", label: "Trading Tips" },
  { value: "options", label: "Options" },
  { value: "investing", label: "Investing" },
  { value: "portfolio", label: "Portfolio" },
  { value: "education", label: "Education" },
];

export default function Admin() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("posts");
  const [showNewPost, setShowNewPost] = useState(false);
  const [showNewWebinar, setShowNewWebinar] = useState(false);

  // Blog post view/edit modal
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<PostForm>(EMPTY_POST_FORM);

  // PDF upload state — edit modal
  const [pdfUploading, setPdfUploading] = useState(false);
  const [editPdfUrl, setEditPdfUrl] = useState<string | null>(null);
  const [editPdfKey, setEditPdfKey] = useState<string | null>(null);

  // PDF upload state — create form
  const [createPdfUploading, setCreatePdfUploading] = useState(false);
  const [createPdfUrl, setCreatePdfUrl] = useState<string | null>(null);
  const [createPdfKey, setCreatePdfKey] = useState<string | null>(null);
  // Ref to hold the raw PDF file so we can upload it atomically on save
  const createPdfFileRef = useRef<File | null>(null);
  const createPdfUrlRef = useRef<string | null>(null);
  const createPdfKeyRef = useRef<string | null>(null);

  // AI YouTube-to-blog state
  const [ytUrl, setYtUrl] = useState("");
  const [ytCategory, setYtCategory] = useState<PostForm["category"]>("education");
  const [aiDraft, setAiDraft] = useState<{ title: string; slug: string; excerpt: string; content: string; readTime: number; metaDescription: string; youtubeUrl: string; videoId: string } | null>(null);

  // Blog post create form
  const [postForm, setPostForm] = useState<PostForm>(EMPTY_POST_FORM);

  // Webinar form
  const [webinarForm, setWebinarForm] = useState({
    title: "",
    slug: "",
    description: "",
    scheduledAt: "",
    durationMinutes: 90,
    isFree: true,
    maxAttendees: 100,
  });

  const { data: posts, refetch: refetchPosts } = trpc.blog.list.useQuery({ published: undefined });
  const { data: webinars, refetch: refetchWebinars } = trpc.webinars.list.useQuery();
  const { data: leads } = trpc.leads.list.useQuery();

  const createPost = trpc.blog.create.useMutation({
    onSuccess: () => {
      toast.success("Post created!");
      setShowNewPost(false);
      refetchPosts();
      setPostForm(EMPTY_POST_FORM);
      setCreatePdfUrl(null);
      setCreatePdfKey(null);
      createPdfFileRef.current = null;
      createPdfUrlRef.current = null;
      createPdfKeyRef.current = null;
    },
    onError: (e) => toast.error("Failed to create post: " + e.message),
  });

  const updatePost = trpc.blog.update.useMutation({
    onSuccess: () => {
      toast.success("Post updated!");
      refetchPosts();
      // Update selectedPost with new values so modal reflects changes
      setSelectedPost((prev: any) => prev ? { ...prev, ...editForm } : null);
      setEditMode(false);
    },
    onError: (e) => toast.error("Failed to update post: " + e.message),
  });

  const deletePost = trpc.blog.delete.useMutation({
    onSuccess: () => {
      toast.success("Post deleted.");
      setSelectedPost(null);
      refetchPosts();
    },
    onError: (e) => toast.error("Failed to delete post: " + e.message),
  });

  const generatePost = trpc.ai.youtubeToPost.useMutation({
    onSuccess: (data) => { setAiDraft(data); toast.success("Blog post draft generated! Review and save below."); },
    onError: (e) => toast.error("AI generation failed: " + e.message),
  });

  const saveAiDraft = trpc.blog.create.useMutation({
    onSuccess: () => {
      toast.success("Post saved to blog!");
      setAiDraft(null);
      setYtUrl("");
      refetchPosts();
      setActiveTab("posts");
    },
    onError: () => toast.error("Failed to save post"),
  });

  // Webinar edit state
  const [editingWebinar, setEditingWebinar] = useState<any | null>(null);
  const [editWebinarForm, setEditWebinarForm] = useState({
    title: "", slug: "", description: "", scheduledAt: "",
    durationMinutes: 90, isFree: true, registrationUrl: "", videoUrl: "", status: "upcoming" as string,
  });

  // Sync editWebinarForm when editingWebinar changes
  const prevEditingWebinarId = useRef<number | null>(null);
  if (editingWebinar && editingWebinar.id !== prevEditingWebinarId.current) {
    prevEditingWebinarId.current = editingWebinar.id;
    const w = editingWebinar;
    const dt = w.scheduledAt ? new Date(w.scheduledAt) : new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const localDt = `${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
    setEditWebinarForm({
      title: w.title ?? "", slug: w.slug ?? "", description: w.description ?? "",
      scheduledAt: localDt, durationMinutes: w.durationMinutes ?? 90,
      isFree: w.isFree ?? true, registrationUrl: w.registrationUrl ?? "",
      videoUrl: w.videoUrl ?? "", status: w.status ?? "upcoming",
    });
  }
  if (!editingWebinar && prevEditingWebinarId.current !== null) {
    prevEditingWebinarId.current = null;
  }

  const createWebinar = trpc.webinars.create.useMutation({
    onSuccess: () => { toast.success("Webinar created!"); setShowNewWebinar(false); refetchWebinars(); },
    onError: (e) => toast.error("Failed to create webinar: " + e.message),
  });

  const updateWebinar = trpc.webinars.update.useMutation({
    onSuccess: () => { toast.success("Webinar updated!"); setEditingWebinar(null); refetchWebinars(); },
    onError: (e) => toast.error("Failed to update webinar: " + e.message),
  });

  const deleteWebinar = trpc.webinars.delete.useMutation({
    onSuccess: () => { toast.success("Webinar deleted."); refetchWebinars(); },
    onError: (e) => toast.error("Failed to delete webinar: " + e.message),
  });

  const uploadPdf = trpc.blog.uploadPdf.useMutation({
    onSuccess: (data) => {
      setEditPdfUrl(data.url);
      setEditPdfKey(data.key);
      setPdfUploading(false);
      toast.success("PDF uploaded! Save the post to attach it.");
    },
    onError: (e) => { setPdfUploading(false); toast.error("PDF upload failed: " + e.message); },
  });

  const uploadCreatePdf = trpc.blog.uploadPdf.useMutation({
    onSuccess: (data) => {
      setCreatePdfUrl(data.url);
      setCreatePdfKey(data.key);
      createPdfUrlRef.current = data.url;
      createPdfKeyRef.current = data.key;
      setCreatePdfUploading(false);
      toast.success("PDF uploaded! It will be attached when you save the post.");
    },
    onError: (e) => { setCreatePdfUploading(false); toast.error("PDF upload failed: " + e.message); },
  });

  const handleCreatePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") { toast.error("Please select a PDF file."); return; }
    if (file.size > 16 * 1024 * 1024) { toast.error("PDF must be under 16 MB."); return; }
    createPdfFileRef.current = file;
    createPdfUrlRef.current = null;
    createPdfKeyRef.current = null;
    setCreatePdfUrl(null);
    setCreatePdfKey(null);
    setCreatePdfUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = (ev.target?.result as string).split(",")[1];
      uploadCreatePdf.mutate({ fileName: file.name, fileBase64: base64 });
    };
    reader.readAsDataURL(file);
  };

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") { toast.error("Please select a PDF file."); return; }
    if (file.size > 16 * 1024 * 1024) { toast.error("PDF must be under 16 MB."); return; }
    setPdfUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = (ev.target?.result as string).split(",")[1];
      uploadPdf.mutate({ fileName: file.name, fileBase64: base64, postId: selectedPost?.id });
    };
    reader.readAsDataURL(file);
  };

  const openPost = (post: any) => {
    setSelectedPost(post);
    setEditMode(false);
    setEditPdfUrl((post as any).pdfUrl ?? null);
    setEditPdfKey((post as any).pdfKey ?? null);
    setEditForm({
      title: post.title ?? "",
      slug: post.slug ?? "",
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      category: post.category ?? "education",
      published: post.published ?? false,
      featured: post.featured ?? false,
      readTime: post.readTime ?? 5,
      metaDescription: post.metaDescription ?? "",
      youtubeUrl: post.youtubeUrl ?? "",
    });
  };

  const handleUpdatePost = () => {
    if (!selectedPost) return;
    const slug = editForm.slug || toSlug(editForm.title);
    if (!slug) { toast.error("Please enter a title first."); return; }
    updatePost.mutate({ id: selectedPost.id, ...editForm, slug });
  };

  const handleDeletePost = (post: any) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    deletePost.mutate({ id: post.id });
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[oklch(73%_0.14_72)]" />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated || loading) {
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  if (user?.role !== "admin") {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[oklch(13%_0.04_255)] mb-2">Access Denied</h2>
            <p className="text-[oklch(55%_0.04_255)]">You don't have admin privileges.</p>
          </div>
        </div>
      </Layout>
    );
  }



  const tabs = [
    { id: "posts" as Tab, label: "Blog Posts", icon: FileText, count: posts?.length ?? 0 },
    { id: "webinars" as Tab, label: "Webinars", icon: Video, count: webinars?.length ?? 0 },
    { id: "leads" as Tab, label: "Leads", icon: Users, count: leads?.length ?? 0 },
    { id: "ai" as Tab, label: "AI Tools", icon: Sparkles, count: 0 },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-[oklch(97%_0.012_80)]">
        {/* Header */}
        <div className="bg-white border-b border-[oklch(88%_0.025_80)] sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[oklch(13%_0.04_255)]" style={{ fontFamily: "Montserrat, sans-serif" }}>Admin Dashboard</h1>
              <p className="text-[oklch(55%_0.04_255)] text-sm mt-1">Manage your content and leads</p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => logout()} className="flex items-center gap-2 px-4 py-2 text-[oklch(55%_0.04_255)] hover:text-[oklch(13%_0.04_255)] transition">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-2 mb-8 border-b border-[oklch(88%_0.025_80)]">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition ${
                    activeTab === tab.id
                      ? "border-[oklch(73%_0.14_72)] text-[oklch(13%_0.04_255)]"
                      : "border-transparent text-[oklch(55%_0.04_255)] hover:text-[oklch(13%_0.04_255)]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span className="ml-1 px-2 py-0.5 bg-[oklch(88%_0.025_80)] text-xs rounded-full">{tab.count}</span>
                </button>
              );
            })}
          </div>

          {/* Blog Posts Tab */}
          {activeTab === "posts" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[oklch(13%_0.04_255)]" style={{ fontFamily: "Montserrat, sans-serif" }}>Blog Posts</h2>
                <button
                  onClick={() => setShowNewPost(!showNewPost)}
                  className="flex items-center gap-2 px-4 py-2 bg-[oklch(73%_0.14_72)] text-white rounded-lg hover:bg-[oklch(65%_0.12_72)] transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  New Post
                </button>
              </div>

              {showNewPost && (
                <div className="bg-white rounded-lg border border-[oklch(88%_0.025_80)] p-6 space-y-4">
                  <h3 className="font-semibold text-[oklch(13%_0.04_255)]">New Blog Post</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                      value={postForm.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setPostForm((prev) => ({
                          ...prev,
                          title,
                          // Auto-fill slug only if user hasn't manually edited it
                          slug: prev.slug === toSlug(prev.title) || prev.slug === "" ? toSlug(title) : prev.slug,
                        }));
                      }}
                      placeholder="Post title"
                    />
                    </div>
                    <div>
                      <Label>Slug</Label>
                      <Input
                      value={postForm.slug}
                      onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                      placeholder="auto-generated-from-title"
                    />
                    </div>
                  </div>
                  <div>
                    <Label>Excerpt</Label>
                    <Input value={postForm.excerpt} onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })} placeholder="Brief excerpt" />
                  </div>
                  <div>
                    <Label>Content (Markdown)</Label>
                    <Textarea value={postForm.content} onChange={(e) => setPostForm({ ...postForm, content: e.target.value })} placeholder="Post content (markdown)" rows={8} />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Category</Label>
                      <Select value={postForm.category} onValueChange={(value) => setPostForm({ ...postForm, category: value as PostForm["category"] })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Read Time (min)</Label>
                      <Input type="number" value={postForm.readTime} onChange={(e) => setPostForm({ ...postForm, readTime: parseInt(e.target.value) })} />
                    </div>
                    <div className="flex items-end gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={postForm.published} onChange={(e) => setPostForm({ ...postForm, published: e.target.checked })} />
                        <span className="text-sm">Published</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={postForm.featured} onChange={(e) => setPostForm({ ...postForm, featured: e.target.checked })} />
                        <span className="text-sm">Featured</span>
                      </label>
                    </div>
                  </div>
                  {/* PDF Upload for new post */}
                  <div className="border border-dashed border-[oklch(73%_0.14_72)] rounded-lg p-4 space-y-3">
                    <Label className="flex items-center gap-2">
                      <FileUp className="w-4 h-4 text-[oklch(73%_0.14_72)]" />
                      PDF Attachment (optional)
                    </Label>
                    {createPdfUrl ? (
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[oklch(73%_0.14_72)]" />
                        <span className="text-sm text-green-600 font-medium">PDF ready to attach</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => { setCreatePdfUrl(null); setCreatePdfKey(null); }}
                          className="text-red-500 border-red-200 hover:bg-red-50 ml-auto"
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <p className="text-xs text-[oklch(55%_0.04_255)]">Upload a PDF to display it inline on the blog post page instead of (or alongside) text content.</p>
                    )}
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={handleCreatePdfFileChange}
                          disabled={createPdfUploading}
                        />
                        <Button type="button" variant="outline" size="sm" disabled={createPdfUploading} asChild>
                          <span>
                            <UploadCloud className="w-3 h-3 mr-1.5" />
                            {createPdfUploading ? "Uploading..." : createPdfUrl ? "Replace PDF" : "Upload PDF"}
                          </span>
                        </Button>
                      </label>
                      <span className="text-xs text-[oklch(65%_0.04_255)]">Max 16 MB · PDF only</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        const slug = postForm.slug || toSlug(postForm.title);
                        if (!slug) { toast.error("Please enter a title first."); return; }
                        // Use ref values (synchronous) to avoid stale closure issues with state
                        const pdfUrl = createPdfUrlRef.current ?? createPdfUrl;
                        const pdfKey = createPdfKeyRef.current ?? createPdfKey;
                        if (!postForm.content.trim() && !pdfUrl) { toast.error("Please add content or upload a PDF."); return; }
                        createPost.mutate({ ...postForm, slug, pdfUrl: pdfUrl ?? undefined, pdfKey: pdfKey ?? undefined });
                      }}
                      disabled={createPost.isPending || createPdfUploading}
                      className="bg-[oklch(73%_0.14_72)] hover:bg-[oklch(65%_0.12_72)]">
                      {createPost.isPending ? "Saving..." : "Save Post"}
                    </Button>
                    <Button onClick={() => { setShowNewPost(false); setCreatePdfUrl(null); setCreatePdfKey(null); createPdfFileRef.current = null; createPdfUrlRef.current = null; createPdfKeyRef.current = null; }} variant="outline">Cancel</Button>
                  </div>
                </div>
              )}

              {/* Posts List */}
              <div className="space-y-2">
                {posts?.length === 0 && (
                  <div className="text-center py-12 text-[oklch(55%_0.04_255)]">
                    No blog posts yet. Create your first post or use the AI Tools tab to generate one from a YouTube video.
                  </div>
                )}
                {posts?.map((post: any) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-lg border border-[oklch(88%_0.025_80)] p-4 flex justify-between items-center hover:border-[oklch(73%_0.14_72)/50] transition-colors"
                  >
                    <div className="flex-1 min-w-0 cursor-pointer" onClick={() => openPost(post)}>
                      <h3 className="font-semibold text-[oklch(13%_0.04_255)] truncate">{post.title}</h3>
                      <p className="text-sm text-[oklch(55%_0.04_255)]">{post.category} • {post.readTime} min read</p>
                      <p className="text-xs mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${post.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {post.published ? "Published" : "Draft"}
                        </span>
                        {post.featured && <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Featured</span>}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                      <button
                        onClick={() => openPost(post)}
                        className="p-2 text-[oklch(55%_0.04_255)] hover:text-[oklch(13%_0.04_255)] hover:bg-[oklch(93%_0.025_80)] rounded-lg transition"
                        title="View / Edit"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {post.published && (
                        <Link href={`/blog/${post.slug}`}>
                          <button className="p-2 text-[oklch(55%_0.04_255)] hover:text-[oklch(13%_0.04_255)] hover:bg-[oklch(93%_0.025_80)] rounded-lg transition" title="View on site">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </Link>
                      )}
                      <button
                        onClick={() => handleDeletePost(post)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Webinars Tab */}
          {activeTab === "webinars" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[oklch(13%_0.04_255)]" style={{ fontFamily: "Montserrat, sans-serif" }}>Webinars</h2>
                <button
                  onClick={() => setShowNewWebinar(!showNewWebinar)}
                  className="flex items-center gap-2 px-4 py-2 bg-[oklch(73%_0.14_72)] text-white rounded-lg hover:bg-[oklch(65%_0.12_72)] transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  New Webinar
                </button>
              </div>

              {showNewWebinar && (
                <div className="bg-white rounded-lg border border-[oklch(88%_0.025_80)] p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input value={webinarForm.title} onChange={(e) => setWebinarForm({ ...webinarForm, title: e.target.value })} placeholder="Webinar title" />
                    </div>
                    <div>
                      <Label>Slug</Label>
                      <Input value={webinarForm.slug} onChange={(e) => setWebinarForm({ ...webinarForm, slug: e.target.value })} placeholder="webinar-slug" />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea value={webinarForm.description} onChange={(e) => setWebinarForm({ ...webinarForm, description: e.target.value })} placeholder="Webinar description" rows={4} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Scheduled At</Label>
                      <Input type="datetime-local" value={webinarForm.scheduledAt} onChange={(e) => setWebinarForm({ ...webinarForm, scheduledAt: e.target.value })} />
                    </div>
                    <div>
                      <Label>Duration (minutes)</Label>
                      <Input type="number" value={webinarForm.durationMinutes} onChange={(e) => setWebinarForm({ ...webinarForm, durationMinutes: parseInt(e.target.value) })} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => createWebinar.mutate({ ...webinarForm, scheduledAt: new Date(webinarForm.scheduledAt) })}
                      disabled={createWebinar.isPending}
                      className="bg-[oklch(73%_0.14_72)] hover:bg-[oklch(65%_0.12_72)]"
                    >
                      {createWebinar.isPending ? "Saving..." : "Save Webinar"}
                    </Button>
                    <Button onClick={() => setShowNewWebinar(false)} variant="outline">Cancel</Button>
                  </div>
                </div>
              )}

              {/* Webinars List */}
              <div className="space-y-2">
                {webinars?.length === 0 && (
                  <div className="text-center py-12 text-[oklch(55%_0.04_255)]">No webinars yet. Create your first webinar above.</div>
                )}
                {webinars?.map((webinar: any) => (
                  <div key={webinar.id} className="bg-white rounded-lg border border-[oklch(88%_0.025_80)] p-4 flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[oklch(13%_0.04_255)]">{webinar.title}</h3>
                      <p className="text-sm text-[oklch(55%_0.04_255)]">{new Date(webinar.scheduledAt).toLocaleString()}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs text-[oklch(73%_0.14_72)]">{webinar.durationMinutes} min</span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-[oklch(94%_0.02_80)] text-[oklch(45%_0.04_255)]">{webinar.status}</span>
                        {webinar.isFree ? <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700">Free</span> : <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">Paid</span>}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => setEditingWebinar(webinar)}
                        className="p-1.5 rounded hover:bg-[oklch(94%_0.02_80)] text-[oklch(55%_0.04_255)] hover:text-[oklch(13%_0.04_255)] transition-colors"
                        title="Edit webinar"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${webinar.title}"? This cannot be undone.`)) {
                            deleteWebinar.mutate({ id: webinar.id });
                          }
                        }}
                        className="p-1.5 rounded hover:bg-red-50 text-[oklch(55%_0.04_255)] hover:text-red-600 transition-colors"
                        title="Delete webinar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Webinar Modal */}
              {editingWebinar && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditingWebinar(null)}>
                  <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="p-6 border-b border-[oklch(88%_0.025_80)] flex justify-between items-center">
                      <h2 className="text-xl font-bold text-[oklch(13%_0.04_255)]" style={{ fontFamily: "Montserrat, sans-serif" }}>Edit Webinar</h2>
                      <button onClick={() => setEditingWebinar(null)} className="text-[oklch(55%_0.04_255)] hover:text-[oklch(13%_0.04_255)]">✕</button>
                    </div>
                    <div className="p-6 space-y-4">
                      <div><Label>Title</Label>
                        <Input value={editWebinarForm.title} onChange={e => setEditWebinarForm(f => ({ ...f, title: e.target.value }))} /></div>
                      <div><Label>Slug</Label>
                        <Input value={editWebinarForm.slug} onChange={e => setEditWebinarForm(f => ({ ...f, slug: e.target.value }))} /></div>
                      <div><Label>Description</Label>
                        <Textarea value={editWebinarForm.description} onChange={e => setEditWebinarForm(f => ({ ...f, description: e.target.value }))} rows={3} /></div>
                      <div><Label>Date & Time</Label>
                        <Input type="datetime-local" value={editWebinarForm.scheduledAt} onChange={e => setEditWebinarForm(f => ({ ...f, scheduledAt: e.target.value }))} /></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><Label>Duration (min)</Label>
                          <Input type="number" value={editWebinarForm.durationMinutes} onChange={e => setEditWebinarForm(f => ({ ...f, durationMinutes: parseInt(e.target.value) || 90 }))} /></div>
                        <div><Label>Status</Label>
                          <Select value={editWebinarForm.status} onValueChange={v => setEditWebinarForm(f => ({ ...f, status: v as any }))}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="upcoming">Upcoming</SelectItem>
                              <SelectItem value="live">Live</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div><Label>Registration URL</Label>
                        <Input value={editWebinarForm.registrationUrl} onChange={e => setEditWebinarForm(f => ({ ...f, registrationUrl: e.target.value }))} placeholder="https://..." /></div>
                      <div><Label>Replay / Video URL</Label>
                        <Input value={editWebinarForm.videoUrl} onChange={e => setEditWebinarForm(f => ({ ...f, videoUrl: e.target.value }))} placeholder="https://..." /></div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="editIsFree" checked={editWebinarForm.isFree} onChange={e => setEditWebinarForm(f => ({ ...f, isFree: e.target.checked }))} />
                        <Label htmlFor="editIsFree">Free webinar</Label>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => updateWebinar.mutate({
                            id: editingWebinar.id,
                            title: editWebinarForm.title,
                            slug: editWebinarForm.slug,
                            description: editWebinarForm.description,
                            scheduledAt: new Date(editWebinarForm.scheduledAt),
                            durationMinutes: editWebinarForm.durationMinutes,
                            status: editWebinarForm.status as any,
                            registrationUrl: editWebinarForm.registrationUrl || undefined,
                            videoUrl: editWebinarForm.videoUrl || undefined,
                            isFree: editWebinarForm.isFree,
                          })}
                          disabled={updateWebinar.isPending}
                          className="flex-1 bg-[oklch(73%_0.14_72)] hover:bg-[oklch(65%_0.16_72)] text-white"
                        >
                          {updateWebinar.isPending ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button onClick={() => setEditingWebinar(null)} variant="outline">Cancel</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Leads Tab */}
          {activeTab === "leads" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[oklch(13%_0.04_255)]" style={{ fontFamily: "Montserrat, sans-serif" }}>Leads</h2>
              <div className="space-y-2">
                {leads?.length === 0 && (
                  <div className="text-center py-12 text-[oklch(55%_0.04_255)]">No leads yet.</div>
                )}
                {leads?.map((lead: any) => (
                  <div key={lead.id} className="bg-white rounded-lg border border-[oklch(88%_0.025_80)] p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-[oklch(13%_0.04_255)]">{lead.firstName} {lead.lastName}</h3>
                        <p className="text-sm text-[oklch(55%_0.04_255)]">{lead.email}</p>
                        {lead.phone && <p className="text-sm text-[oklch(55%_0.04_255)]">{lead.phone}</p>}
                      </div>
                      <span className="px-2 py-1 bg-[oklch(88%_0.025_80)] text-xs rounded">{lead.inquiryType}</span>
                    </div>
                    <p className="text-sm text-[oklch(55%_0.04_255)] mt-2">{lead.message}</p>
                    <p className="text-xs text-[oklch(65%_0.04_255)] mt-2">{new Date(lead.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Tools Tab */}
          {activeTab === "ai" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[oklch(13%_0.04_255)]" style={{ fontFamily: "Montserrat, sans-serif" }}>AI Tools</h2>

              <div className="bg-white rounded-lg border border-[oklch(88%_0.025_80)] p-6 space-y-4">
                <h3 className="font-semibold text-[oklch(13%_0.04_255)]">YouTube to Blog Post</h3>
                <p className="text-sm text-[oklch(55%_0.04_255)]">Generate a blog post from a YouTube video using AI. Supports youtube.com/watch?v=, youtu.be/, /shorts/, and /embed/ links.</p>

                <div>
                  <Label>YouTube URL</Label>
                  <Input value={ytUrl} onChange={(e) => setYtUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..." />
                </div>

                <div>
                  <Label>Category</Label>
                  <Select value={ytCategory} onValueChange={(value) => setYtCategory(value as PostForm["category"])}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={() => generatePost.mutate({ youtubeUrl: ytUrl })}
                  disabled={generatePost.isPending || !ytUrl}
                  className="bg-[oklch(73%_0.14_72)] hover:bg-[oklch(65%_0.12_72)]"
                >
                  {generatePost.isPending ? "Generating..." : "Generate Draft"}
                </Button>

                {aiDraft && (
                  <div className="mt-6 p-4 bg-[oklch(97%_0.012_80)] rounded-lg border border-[oklch(88%_0.025_80)] space-y-4">
                    <h4 className="font-semibold text-[oklch(13%_0.04_255)]">Generated Draft</h4>
                    <div>
                      <p className="text-xs text-[oklch(55%_0.04_255)] mb-1">Title</p>
                      <p className="font-semibold text-[oklch(13%_0.04_255)]">{aiDraft.title}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[oklch(55%_0.04_255)] mb-1">Excerpt</p>
                      <p className="text-sm text-[oklch(13%_0.04_255)]">{aiDraft.excerpt}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[oklch(55%_0.04_255)] mb-1">Content Preview</p>
                      <p className="text-sm text-[oklch(13%_0.04_255)] line-clamp-4 whitespace-pre-line">{aiDraft.content.slice(0, 400)}...</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => saveAiDraft.mutate({ title: aiDraft.title, slug: aiDraft.slug, excerpt: aiDraft.excerpt, content: aiDraft.content, category: ytCategory, published: false, featured: false, readTime: aiDraft.readTime })}
                        disabled={saveAiDraft.isPending}
                        className="bg-[oklch(73%_0.14_72)] hover:bg-[oklch(65%_0.12_72)]"
                      >
                        {saveAiDraft.isPending ? "Saving..." : "Save to Blog (Draft)"}
                      </Button>
                      <Button onClick={() => setAiDraft(null)} variant="outline">Discard</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Blog Post View / Edit Modal */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => { if (!open) { setSelectedPost(null); setEditMode(false); } }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {editMode ? (
                <><Pencil className="w-4 h-4 text-[oklch(73%_0.14_72)]" /> Edit Post</>
              ) : (
                <><Eye className="w-4 h-4 text-[oklch(73%_0.14_72)]" /> View Post</>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedPost && !editMode && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${selectedPost.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {selectedPost.published ? "Published" : "Draft"}
                </span>
                {selectedPost.featured && <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Featured</span>}
                <span className="px-2 py-0.5 rounded-full text-xs bg-[oklch(88%_0.025_80)] text-[oklch(35%_0.04_255)]">{selectedPost.category}</span>
                <span className="text-xs text-[oklch(55%_0.04_255)]">{selectedPost.readTime} min read</span>
              </div>
              <h2 className="text-xl font-bold text-[oklch(13%_0.04_255)]">{selectedPost.title}</h2>
              {selectedPost.excerpt && <p className="text-[oklch(48%_0.04_255)] italic border-l-2 border-[oklch(73%_0.14_72)] pl-3">{selectedPost.excerpt}</p>}
              <div className="bg-[oklch(97%_0.012_80)] rounded-lg p-4 max-h-64 overflow-y-auto">
                <p className="text-sm text-[oklch(35%_0.04_255)] whitespace-pre-wrap font-mono">{selectedPost.content}</p>
              </div>
              {selectedPost.youtubeUrl && (
                <p className="text-sm text-[oklch(55%_0.04_255)]">YouTube: <a href={selectedPost.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-[oklch(73%_0.14_72)] underline">{selectedPost.youtubeUrl}</a></p>
              )}
              <p className="text-xs text-[oklch(65%_0.04_255)]">Slug: /blog/{selectedPost.slug}</p>
            </div>
          )}

          {selectedPost && editMode && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={editForm.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setEditForm((prev) => ({
                        ...prev,
                        title,
                        slug: prev.slug === toSlug(prev.title) || prev.slug === "" ? toSlug(title) : prev.slug,
                      }));
                    }}
                  />
                </div>
                <div>
                  <Label>Slug</Label>
                  <Input value={editForm.slug} onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })} />
                </div>
              </div>
              <div>
                <Label>Excerpt</Label>
                <Input value={editForm.excerpt} onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })} />
              </div>
              <div>
                <Label>Content (Markdown)</Label>
                <Textarea value={editForm.content} onChange={(e) => setEditForm({ ...editForm, content: e.target.value })} rows={10} className="font-mono text-sm" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select value={editForm.category} onValueChange={(value) => setEditForm({ ...editForm, category: value as PostForm["category"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Read Time (min)</Label>
                  <Input type="number" value={editForm.readTime} onChange={(e) => setEditForm({ ...editForm, readTime: parseInt(e.target.value) })} />
                </div>
                <div className="flex items-end gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={editForm.published} onChange={(e) => setEditForm({ ...editForm, published: e.target.checked })} />
                    <span className="text-sm">Published</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={editForm.featured} onChange={(e) => setEditForm({ ...editForm, featured: e.target.checked })} />
                    <span className="text-sm">Featured</span>
                  </label>
                </div>
              </div>
              <div>
                <Label>YouTube URL (optional)</Label>
                <Input value={editForm.youtubeUrl} onChange={(e) => setEditForm({ ...editForm, youtubeUrl: e.target.value })} placeholder="https://youtu.be/..." />
              </div>
              <div>
                <Label>Meta Description (optional)</Label>
                <Input value={editForm.metaDescription} onChange={(e) => setEditForm({ ...editForm, metaDescription: e.target.value })} placeholder="SEO meta description" />
              </div>

              {/* PDF Upload */}
              <div className="border border-dashed border-[oklch(73%_0.14_72)] rounded-lg p-4 space-y-3">
                <Label className="flex items-center gap-2">
                  <FileUp className="w-4 h-4 text-[oklch(73%_0.14_72)]" />
                  PDF Attachment (optional)
                </Label>
                {editPdfUrl ? (
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[oklch(73%_0.14_72)]" />
                    <a href={editPdfUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[oklch(73%_0.14_72)] underline truncate max-w-xs">View current PDF</a>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => { setEditPdfUrl(null); setEditPdfKey(null); }}
                      className="text-red-500 border-red-200 hover:bg-red-50 ml-auto"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <p className="text-xs text-[oklch(55%_0.04_255)]">No PDF attached. Upload one below to display it inline on the blog post page.</p>
                )}
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={handlePdfFileChange}
                      disabled={pdfUploading}
                    />
                    <Button type="button" variant="outline" size="sm" disabled={pdfUploading} asChild>
                      <span>
                        <UploadCloud className="w-3 h-3 mr-1.5" />
                        {pdfUploading ? "Uploading..." : editPdfUrl ? "Replace PDF" : "Upload PDF"}
                      </span>
                    </Button>
                  </label>
                  <span className="text-xs text-[oklch(65%_0.04_255)]">Max 16 MB · PDF only</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex gap-2 flex-wrap">
            {!editMode ? (
              <>
                <Button onClick={() => setEditMode(true)} className="bg-[oklch(73%_0.14_72)] hover:bg-[oklch(65%_0.12_72)]">
                  <Pencil className="w-4 h-4 mr-2" /> Edit Post
                </Button>
                {selectedPost?.published && (
                  <Link href={`/blog/${selectedPost.slug}`}>
                    <Button variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" /> View on Site
                    </Button>
                  </Link>
                )}
                <Button variant="outline" onClick={() => { setSelectedPost(null); setEditMode(false); }}>Close</Button>
              </>
            ) : (
              <>
                <Button onClick={handleUpdatePost} disabled={updatePost.isPending} className="bg-[oklch(73%_0.14_72)] hover:bg-[oklch(65%_0.12_72)]">
                  {updatePost.isPending ? "Saving..." : "Save Changes"}
                </Button>
                <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
