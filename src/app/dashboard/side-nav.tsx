'use client'

import { cn } from "@/lib/utils";
import { ClipboardPen, FilesIcon, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
   const pathName = usePathname();

  return (
      <nav className="sticky top-20">
        <ul className="space-y-6">
          <li>
            <Link
              className={cn("font-light flex gap-2 items-center text-xl hover:text-purple-100",
               {
                  "text-purple-300": pathName.endsWith("/search"),
               }
              )}
              href="/dashboard/search"
            > 
              <Search/>
                Search
            </Link>
          </li>         
          <li>
            <Link
              className={cn("font-light flex gap-2 items-center text-xl hover:text-purple-100",
               {
                  "text-purple-300": pathName.endsWith("/documents"),
               }
              )}
              href="/dashboard/documents"
            > 
              <FilesIcon/>
              Documents
            </Link>
          </li>
          <li>
            <Link
              className={cn("font-light flex gap-2 items-center text-xl hover:text-purple-200",
               {
                  "text-purple-300": pathName.includes("/notes"),
               }
              )}
              href="/dashboard/notes"
            >
              <ClipboardPen/>
              Notes
            </Link>
          </li>
        </ul>
      </nav>
  );
}
