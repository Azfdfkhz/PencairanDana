"use client";

import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  Wallet,
  WalletCards,
} from "lucide-react";

const menuItems = [
  {
    name: "Pencairan Dana",
    href: "/",
    icon: Wallet,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Mobile Top Header */}
      <div className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white shadow-xs md:hidden">
        <div className="grid grid-cols-3 h-14 items-center px-4">
          <Link href="/overview" className="text-[#263238] justify-self-start flex items-center p-1">
            <ArrowLeft size={22} strokeWidth={2} />
          </Link>

          <div className="justify-self-center">
            <Image
              src="/images/Logo-SH.png"
              alt="Sharing Happiness"
              width={140}
              height={32}
              className="h-8 w-auto object-contain"
            />
          </div>

          <div className="w-7 justify-self-end" />
        </div>
      </div>


      {/* Desktop Sidebar*/}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[172px] flex-col bg-white shadow-[2px_0_8px_rgba(0,0,0,0.12)] md:flex">
        {/* Header */}
        <div className="flex h-[70px] items-center px-5">
          <Link href="/overview" className="mr-4 text-[#263238]">
            <ArrowLeft size={25} strokeWidth={2} />
          </Link>

          <div>
            <Image
              src="/images/Logo-SH.png"
              alt="Sharing Happiness"
              width={140}
              height={32}
              className="h-8 w-auto object-contain"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex h-[48px] items-center gap-4 px-7
                  text-[12px] font-semibold
                  transition-colors
                  ${
                    active
                      ? "bg-[#e8f0fb] text-[#263238]"
                      : "text-[#263238] "
                  }
                `}
              >
                <Icon size={23} strokeWidth={2.3} className="text-[#2874c6]" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
} 