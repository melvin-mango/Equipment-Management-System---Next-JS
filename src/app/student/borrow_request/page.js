"use client";

import { useSelectedItems } from "@/context/SelectedItemsContext";
import { useState, useEffect } from "react";
import {jwtDecode }from "jwt-decode";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BorrowRequest() {
    const { selectedItems } = useSelectedItems(); // Access selected items from context
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [user, setUser] = useState(null);
    const router = useRouter();

    // Decode the JWT token to get user information
    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        if (token) {
            try {
                const decoded = jwtDecode(token);

                // Check if the user's role is student
                if (decoded.role !== "student") {
                    console.error("Unauthorized access: User is not a student");
                    router.push("/login"); // Redirect to login if the role is not student
                    return;
                }

                console.log("Decoded user:", decoded); // Debugging log
                setUser({ id: decoded.id, name: decoded.fname });
                 // Use fname for the name
            } catch (error) {
                console.error("Failed to decode token:", error);
                router.push("/login"); // Redirect to login if token is invalid
            }
        } else {
            console.error("Token not found");
            router.push("/login"); // Redirect to login if token is missing
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form inputs
        if (selectedItems.length === 0) {
            setError("Please select at least one piece of equipment.");
            return;
        }

        const borrowDate = e.target.borrowDate.value;
        const returnDate = e.target.returnDate.value;

        if (new Date(borrowDate) >= new Date(returnDate)) {
            setError("The return date must be after the borrow date.");
            return;
        }

        // Debugging log to check user object
        console.log("User object before submission:", user);

        if (!user || !user.name) {
            setError("User information is missing. Please log in again.");
            return;
        }

        // Collect form data
        const formData = {
            selectedEquipments: selectedItems,
            borid: user.id, // Use the logged-in user's ID
            borname: user.name, // Use the logged-in user's name
            purpose: e.target.purpose.value,
            borrowDate,
            returnDate,
            offCampus: e.target.offCampus.checked,
            timestamp: new Date().toISOString(), // Add a timestamp
        };

        try {
            // Send the borrow request to the backend API
            const response = await fetch("/api/borrow-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccess(data.message);
                setError("");
                alert("Equipment Borrowed Successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 3000);

            } else {
                const errorData = await response.json();
                setError(errorData.error || "Failed to submit borrow request.");
            }
        } catch (error) {
            console.error("Error submitting borrow request:", error);
            setError("An unexpected error occurred. Please try again.");
        }
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading user information...</p>
            </div>
        );
    }

    return (
        <div className="bg-white flex float-start flex-col items-center justify-between h-screen font-[family-name:var(--font-geist-sans)]">
            <Navbar />
            <div className="flex items-start h-full mb-30 w-screen justify-center overflow-scroll">
                <div className="border border-gray-300 w-screen mx-2 md:mx-10 lg:mx-40 xl:mx-60 px-2 py-2 mt-10">
                    <p className="text-3xl font-bold text-blue-950">Borrow Requests</p>
                    <form className="w-full mt-5 text-black" onSubmit={handleSubmit}>
                        <div className="flex flex-col mb-5">
                            <label className="text-lg mb-2">Equipments Selected</label>
                            <output className="w-full h-28 border p-2 border-gray-300 rounded-md overflow-y-auto">
                                {selectedItems.length > 0 ? (
                                    selectedItems.map((item) => (
                                        <p key={item.id}>
                                            {item.name} (ID: {item.id})
                                        </p>
                                    ))
                                ) : (
                                    <p>No equipment selected.</p>
                                )}
                            </output>
                        </div>
                        <div className="flex flex-col mb-5">
                            <label className="text-lg mb-2">Purpose of use</label>
                            <input
                                type="text"
                                name="purpose"
                                className="w-full h-10 border px-2 border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="flex flex-col mb-5">
                            <label className="text-lg mb-2">Borrowing Date</label>
                            <input
                                type="date"
                                name="borrowDate"
                                className="w-full h-10 border px-2 border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="flex flex-col mb-5">
                            <label className="text-lg mb-2">Return Date</label>
                            <input
                                type="date"
                                name="returnDate"
                                className="w-full h-10 border px-2 border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="flex mb-5">
                            <label className="text-lg mb-2">
                                Will the equipment(s) above be used outside campus?
                            </label>
                            <input
                                type="checkbox"
                                name="offCampus"
                                className="w-5 h-5 border my-1 mx-2 border-gray-300 rounded-md"
                            />
                        </div>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        {success && <p className="text-green-500 mb-4">{success}</p>}
                        <button
                            type="submit"
                            className="bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-indigo-950"
                        >
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}