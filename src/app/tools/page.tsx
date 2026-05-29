import type { Metadata } from "next";
import ToolsDirectory from "@/components/tools/ToolsDirectory";

export const metadata: Metadata = {
  title: "ফ্রি Electrical Engineering Tools — BNBC 2020 | OhmiclyLearn",
  description:
    "RSC Checklist, IR Test Report, LPS Calculator — BNBC 2020 reference সহ ফ্রি download।",
};

export default function ToolsPage() {
  return <ToolsDirectory />;
}
