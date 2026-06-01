"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import FaqForm from "@/components/admin/FaqForm";

type Faq = {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  is_published: boolean;
};

export default function EditFaqPage() {
  const params = useParams();
  const [faq, setFaq] = useState<Faq | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/faq`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        const found = list.find((f: Faq) => f.id === params.id);
        setFaq(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return <div className="text-slate-500 font-bn">Loading...</div>;
  }

  if (!faq) {
    return <div className="text-red-500 font-bn">FAQ not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 font-bn mb-8">
        প্রশ্ন সম্পাদনা করুন
      </h1>
      <FaqForm mode="edit" initialData={faq} />
    </div>
  );
}
