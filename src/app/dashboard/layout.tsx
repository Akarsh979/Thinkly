import { ClipboardPen, Cog, FilesIcon } from "lucide-react";
import Link from "next/link";
import SideNav from "./side-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex container mx-auto pt-12">
      <div className="w-64 flex-shrink-0">
        <SideNav/>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
