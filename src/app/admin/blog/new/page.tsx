import BlogEditor from "@/components/admin/BlogEditor";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 font-bn mb-8">
        নতুন পোস্ট লিখুন
      </h1>
      <BlogEditor mode="create" />
    </div>
  );
}
