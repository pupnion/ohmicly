import type { Metadata } from "next";
import ABCLicensePage from "@/components/abc-license/ABCLicensePage";

export const metadata: Metadata = {
  title: "Get ABC License — Step by Step Guide | OhmiclyLearn",
  description:
    "Step-by-step guide to get electrical ABC License. Grade A, B, C — application process, required documents, MCQ Practice.",
};

export default function Page() {
  return <ABCLicensePage />;
}
