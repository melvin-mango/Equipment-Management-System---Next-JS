"use client";
import Navbar3 from "@/components/Navbar3";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        schoolId: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        if (!formData.fullName || !formData.email || !formData.schoolId || !formData.password || !formData.confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError(""); // Clear any previous errors

        try {
            // Send data to the existing user API
            const response = await fetch("/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: formData.schoolId, // Map schoolId to id
                    fname: formData.fullName, // Map fullName to fname
                    email: formData.email,
                    password: formData.password,
                    role: "student", // Default role for new users
                }),
            });

            if (response.ok) {
                setSuccess("Account created successfully! Redirecting to login...");
                setTimeout(() => {
                    window.location.href = "/login"; // Redirect to login page
                }, 3000);
            } else {
                const data = await response.json();
                setError(data.error || "Failed to create account. Please try again.");
            }
        } catch (error) {
            console.error("Error during sign up:", error);
            setError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="bg-white flex flex-col items-center justify-between h-screen font-[family-name:var(--font-geist-sans)]">
            <Navbar3 />
            {/* Main content */}
            <div className="flex items-center h-full mb-30 w-screen justify-center overflow-scroll">
                <div className="border border-gray-300 w-screen md:w-3/4 lg:w-1/2 xl:w-1/3 mx-2 md:mx-10 lg:mx-40 xl:mx-60 px-2 py-2 md:px-10 md:py-10 mt-10">
                    <p className="text-3xl font-bold text-blue-950">Sign Up Page</p>
                    <form className="w-full mt-5 text-black" onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div className="flex flex-col mb-5">
                            <label className="text-lg mb-2">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full h-10 border px-2 border-gray-300 rounded-md"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        {/* School Email */}
                        <div className="flex flex-col mb-5">
                            <label className="text-lg mb-2">School Email</label>
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
                        {/* School ID */}
                        <div className="flex flex-col mb-5">
                            <label className="text-lg mb-2">School ID</label>
                            <input
                                type="text"
                                name="schoolId"
                                value={formData.schoolId}
                                onChange={handleChange}
                                className="w-full h-10 border px-2 border-gray-300 rounded-md"
                                placeholder="Enter school ID"
                                required
                            />
                        </div>
                        {/* Password */}
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
                        {/* Confirm Password */}
                        <div className="flex flex-col mb-5">
                            <label className="text-lg mb-2">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full h-10 border px-2 border-gray-300 rounded-md"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                        {/* Error Message */}
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        {/* Success Message */}
                        {success && <p className="text-green-500 mb-4">{success}</p>}
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-blue-950 w-full text-white px-4 py-2 rounded-md hover:bg-indigo-950"
                        >
                            Sign Up
                        </button>
                        <p className="mt-4">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-500">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
            {/* Footer Component */}
            <Footer />
        </div>
    );
}