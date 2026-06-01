import ToolForm from "@/components/admin/ToolForm";

export default function NewToolPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 font-bn mb-8">
        নতুন Tool যোগ করুন
      </h1>
      <ToolForm mode="create" />
    </div>
  );
}
