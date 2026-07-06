import AdminShell from "@/components/admin/AdminShell";

export const metadata = { title: "Admin \u2022 Invest With Surendra", robots: { index: false } };

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
