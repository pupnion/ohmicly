import TestimonialForm from "@/components/admin/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 font-bn mb-8">
        নতুন Testimonial যোগ করুন
      </h1>
      <TestimonialForm mode="create" />
    </div>
  );
}
