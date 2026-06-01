import type { Metadata } from "next";
import ToolsDirectory from "@/components/tools/ToolsDirectory";

export const metadata: Metadata = {
  title: "Free Electrical Engineering Tools — BNBC 2020 | OhmiclyLearn",
  description:
    "RSC Checklist, IR Test Report, LPS Calculator — free download with BNBC 2020 reference.",
};

export default function ToolsPage() {
  return <ToolsDirectory />;
}
