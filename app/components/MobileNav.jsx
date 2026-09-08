"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet } from "lucide-react";

const menuItems = [
  {
    name: "Pencairan Dana",
    href: "/",
    icon: Wallet,
  },
  
];

export default function MobileNavTabs() {
  const pathname = usePathname();

  const isActive = (href) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="flex gap-3 my-4 md:hidden">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              flex h-[44px] flex-1 items-center justify-center gap-2
              rounded-full text-[13px] transition-all duration-200
              ${
                active
                  ? "bg-[#d3e4fd] text-[#1a4f8a] font-bold shadow-[0_3px_10px_rgba(40,116,198,0.25)] border border-[#90b2df]"
                  : "bg-[#f1f5fb] text-[#64748b] font-medium border border-gray-200 shadow-xs hover:bg-[#9fc3ee] hover:text-[#263238]"
              }
            `}
          >
            <Icon
              size={19}
              strokeWidth={active ? 2.5 : 2}
              className={active ? "text-[#2874c6]" : "text-[#8da3be]"}
            />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
