import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { ToastContainer } from "@/components/admin/Toast";

export const metadata: Metadata = {
  title: "Admin — OhmiclyLearn",
  description: "Admin panel for OhmiclyLearn",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="lg:pl-60">
        <AdminHeader />
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
      <ToastContainer />
    </div>
  );
}
