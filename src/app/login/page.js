"use client";
import Navbar3 from "@/components/Navbar3";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/SessionContext";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();
    const { setIsLoggedIn } = useSession();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                const { token, role } = data;

                // Store the token in a cookie
                document.cookie = `token=${token}; path=/; max-age=3600; secure`;

                // Set the user as logged in
                setIsLoggedIn(true);

                // Redirect based on role
                if (role === "student") router.push("/student/equipment");
                else if (role === "lecturer") router.push("/lecturer");
                else if (role === "hod") router.push("/hod");
                else if (role === "technician") router.push("/technician/dashboard");
                else if (role === "security") router.push("/security");
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Invalid email or password.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="bg-white flex flex-col items-center justify-between h-screen font-[family-name:var(--font-geist-sans)]">
            <Navbar3/>
            <div className="flex items-center h-full mb-30 w-screen justify-center overflow-scroll">
                <div className="border border-gray-300 w-screen md:w-3/4 lg:w-1/2 xl:w-1/3 mx-2 md:mx-10 lg:mx-40 xl:mx-60 px-2 py-2 md:px-10 md:py-10 mt-10">
                    <p className="text-3xl font-bold text-blue-950">Login Page</p>
                    <form className="w-full mt-5 text-black" onSubmit={handleSubmit}>
                        <div className="flex flex-col mb-5">
                            <label className="text-lg mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full h-10 border px-2 border-gray-300 rounded-md"
                                placeholder="Enter school email"
                                required
                            />
                        </div>
                        <div className="flex flex-col mb-5">
                            <label className="text-lg mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full h-10 border px-2 border-gray-300 rounded-md"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <button
                            type="submit"
                            className="bg-blue-950 w-full text-white px-4 py-2 rounded-md hover:bg-indigo-950"
                        >
                            Sign In
                        </button>
                        <p className="mt-4">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="text-blue-500">
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
}








