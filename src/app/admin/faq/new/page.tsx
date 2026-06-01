import FaqForm from "@/components/admin/FaqForm";

export default function NewFaqPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 font-bn mb-8">
        নতুন প্রশ্ন যোগ করুন
      </h1>
      <FaqForm mode="create" />
    </div>
  );
}
