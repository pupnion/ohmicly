"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TestimonialForm from "@/components/admin/TestimonialForm";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  district: string;
  content: string;
  avatar_url: string;
  rating: number;
  is_published: boolean;
};

export default function EditTestimonialPage() {
  const params = useParams();
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/testimonials`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        const found = list.find(
          (t: Testimonial) => t.id === params.id
        );
        setTestimonial(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return <div className="text-slate-500 font-bn">Loading...</div>;
  }

  if (!testimonial) {
    return <div className="text-red-500 font-bn">Testimonial not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 font-bn mb-8">
        Testimonial সম্পাদনা করুন: {testimonial.name}
      </h1>
      <TestimonialForm mode="edit" initialData={testimonial} />
    </div>
  );
}
