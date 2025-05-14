"use client";

import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

export default function Lecturer() {
    const [borrowedEquipment, setBorrowedEquipment] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRequest, setSelectedRequest] = useState(null); // For the modal

    // Fetch equipment data and group by borrower
    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await fetch("/api/lecturer-action", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
    
                if (!response.ok) {
                    throw new Error("Failed to fetch equipment data.");
                }
    
                const data = await response.json();
    
                // Group borrowed equipment by borrower ID and name
                const grouped = {};
                data
                    .filter((item) => item.status === "borrowed" && item.lecapp === "") // Filter by status and lecapp
                    .forEach((item) => {
                        const key = `${item.borid}-${item.borname}`;
                        if (!grouped[key]) {
                            grouped[key] = {
                                borid: item.borid,
                                borname: item.borname,
                                timestamp: item.timestamp,
                                purpose_of_use: item.purpose_of_use,
                                equipment: [],
                            };
                        }
                        grouped[key].equipment.push(item.name);
                    });
    
                setBorrowedEquipment(Object.values(grouped));
            } catch (error) {
                console.error("Error fetching equipment data:", error);
            }
        };
    
        fetchEquipment();
    }, []);

    // Handle search functionality
    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = borrowedEquipment.filter((item) =>
            item.borname.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setBorrowedEquipment(filtered);
    };

    // Handle Approve/Reject actions
const handleAction = async (borid, action) => {
    try {
        // Iterate over all equipment items in the selected request
        const equipmentUpdates = selectedRequest.equipment.map(async (equipmentName) => {
            const response = await fetch("/api/lecturer-action", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: borid, equipmentName, action }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update equipment.");
            }
        });

        // Wait for all updates to complete
        await Promise.all(equipmentUpdates);

        alert(`Request ${action} successfully.`);

        // Update the local state for each equipment item
        const updatedEquipment = borrowedEquipment.map((item) => {
            if (item.borid === borid) {
                return {
                    ...item,
                    equipment: item.equipment.map((equipmentName) => ({
                        name: equipmentName,
                        lecapp: action, // Update lecapp for each equipment item
                    })),
                };
            }
            return item;
        });

        setBorrowedEquipment(updatedEquipment);
        setSelectedRequest(null); // Close the modal
    } catch (error) {
        console.error("Error updating equipment:", error);
        alert("An unexpected error occurred. Please try again.");
    }
};

    return (
        <div className="bg-white flex float-start flex-col items-center justify-between h-screen font-[family-name:var(--font-geist-sans)]">
            {/* Navbar Component */}
            <Navbar2 />

            {/* Main Content */}
            <div className="flex items-start h-full mb-30 overflow-y-scroll w-screen justify-center">
                <div className="border border-gray-300 w-screen mx-2 md:mx-10 lg:mx-40 xl:mx-60 px-2 py-2 mt-10">
                    <div className="items-left justify-between flex flex-col md:flex-row h-auto w-auto my-5">
                        <p className="text-3xl font-bold text-blue-950">Borrowed Equipment</p>
                        <div className="mt-5 md:mt-0">
                            <form onSubmit={handleSearch}>
                                <label className="space-x-5">
                                    <input
                                        type="text"
                                        placeholder="Search by Student Name..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-[150px] md:w-[300px] xl:w-[400px] text-black px-4 py-2 h-10 border border-black rounded-md"
                                    />
                                    <input
                                        type="submit"
                                        value="Search"
                                        className="bg-blue-950 cursor-pointer text-white px-4 py-2 rounded-md"
                                    />
                                </label>
                            </form>
                        </div>
                    </div>

                    {/* Borrowed Equipment Table */}
                    <table className="w-full border-collapse border-b border-gray-300 mt-3 md:mt-5 lg:mt-10 overflow-x-auto">
                        <thead>
                            <tr className="border-b border-gray-200 font-extrabold text-gray-600">
                                <th className="py-5 px-2 md:px-5 text-left">Time of Request</th>
                                <th className="py-5 px-2 md:px-5 text-left">Student ID</th>
                                <th className="py-5 px-2 md:px-5 text-left">Request</th>
                            </tr>
                        </thead>
                        <tbody>
                            {borrowedEquipment.length > 0 ? (
                                borrowedEquipment.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-200 hover:bg-gray-100"
                                    >
                                        <td className="py-5 px-2 md:px-5 text-left text-black font-semibold">
                                            {new Date(item.timestamp).toLocaleString()}
                                        </td>
                                        <td className="py-5 px-2 md:px-5 text-left text-black font-semibold">
                                            {item.borid}
                                        </td>
                                        <td className="py-5 px-2 md:px-5 text-left text-blue-950 font-semibold cursor-pointer">
                                            <span onClick={() => setSelectedRequest(item)}>
                                                {item.borname}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="2"
                                        className="py-5 px-2 md:px-5 text-center text-black font-semibold"
                                    >
                                        No borrowed equipment found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Request Details */}
            {selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-[90%] md:w-[50%] p-5 rounded-md shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Request Details</h2>
                        <p className="mb-2">
                            <strong>Student Name:</strong> {selectedRequest.borname}
                        </p>
                        <p className="mb-2">
                            <strong>Equipment Borrowed:</strong>{" "}
                            {selectedRequest.equipment.join(", ")}
                        </p>
                        <p className="mb-4">
                            <strong>Purpose:</strong> {selectedRequest.purpose_of_use}
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => handleAction(selectedRequest.borid, "approved")}
                                className="bg-blue-950 text-white px-4 py-2 rounded-md"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleAction(selectedRequest.borid, "rejected")}
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="bg-gray-300 text-black px-4 py-2 rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Component */}
            <Footer />
        </div>
    );
}