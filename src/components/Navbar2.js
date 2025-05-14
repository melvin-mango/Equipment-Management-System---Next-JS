"use client";
import Link from "next/link";
import Image from "next/image";

{/* Navbar for technician */}
export default function Navbar2() {
  return (
    <nav className="flex w-full justify-between items-center border-b-4 border-indigo-300 px-10 py-4 bg-indigo-200">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/Logo.png"
          alt="EMS Logo"
          width={200}
          height={100}
          className="w-40 h-auto"
        />
      </Link>

      {/* Logout Button (Desktop) */}
      <div className="flex">
        <Link href="/" className="font-semibold px-6 py-2 rounded-md bg-blue-950 text-white">
          Logout
        </Link>
      </div>
    </nav>
  );
}