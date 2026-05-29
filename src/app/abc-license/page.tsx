import type { Metadata } from "next";
import ABCLicensePage from "@/components/abc-license/ABCLicensePage";

export const metadata: Metadata = {
  title: "ABC License করুন — ধাপে ধাপে গাইড | OhmiclyLearn",
  description:
    "ইলেকট্রিক্যাল ABC License পেতে ধাপে ধাপে গাইড। Grade A, B, C — আবেদন প্রক্রিয়া, প্রয়োজনীয় কাগজপত্র, MCQ Practice।",
};

export default function Page() {
  return <ABCLicensePage />;
}
