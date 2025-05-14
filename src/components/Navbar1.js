"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

{/* Navbar for technician */}
export default function Navbar1() {
    const pathname = usePathname(); // Get the current route

    const linkClass = (path) =>
        `px-4 py-2 rounded-md font-semibold transition ${
            pathname === path ? "bg-white text-blue-950" : "text-blue-950"
        }`;

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

            {/* Desktop Menu */}
            <div className="hidden lg:flex gap-12 text-blue-950">
                <Link href="/technician/dashboard" className={linkClass("/technician/dashboard")}>
                    Dashboard
                </Link>
                <Link href="/technician/requests" className={linkClass("/technician/requests")}>
                    Requests
                </Link>
                <Link href="/technician/returns" className={linkClass("/technician/returns")}>
                    Returns
                </Link>
                <Link href="/technician/equipments" className={linkClass("/technician/equipments")}>
                    Equipments
                </Link>
                <Link href="/technician/users" className={linkClass("/technician/users")}>
                    Users
                </Link>
            </div>

            {/* Logout Button (Desktop) */}
            <div className="hidden lg:flex">
                <Link href="/" className="font-semibold px-6 py-2 rounded-md bg-blue-950 text-white">
                    Logout
                </Link>
            </div>

            {/* Mobile Sidebar */}
            <div className="lg:hidden z-10">
                <input type="checkbox" id="menu-toggle" className="hidden peer" />
                <label htmlFor="menu-toggle" className="text-3xl text-blue-950 cursor-pointer">
                    ☰
                </label>

                <div className="fixed text-blue-950 top-0 left-0 w-2/3 md:w-1/3 h-full bg-indigo-200 shadow-lg flex flex-col p-6 gap-6 -translate-x-full peer-checked:translate-x-0 transition-transform duration-300">
                    <label htmlFor="menu-toggle" className="self-end text-blue-950 text-3xl cursor-pointer">
                        ✖
                    </label>

                    <Link href="/technician/dashboard" className={linkClass("/technician/dashboard")}>
                        Dashboard
                    </Link>
                    <Link href="/technician/requests" className={linkClass("/technician/requests")}>
                        Requests
                    </Link>
                    <Link href="/technician/returns" className={linkClass("/technician/returns")}>
                        Returns
                    </Link>
                    <Link href="/technician/equipments" className={linkClass("/technician/equipments")}>
                        Equipments
                    </Link>
                    <Link href="/technician/users" className={linkClass("/technician/users")}>
                        Users
                    </Link>

                    <Link href="/" className="font-semibold px-6 py-2 rounded-md bg-blue-950 text-white text-center">
                        Logout
                    </Link>
                </div>
            </div>
        </nav>
    );
}