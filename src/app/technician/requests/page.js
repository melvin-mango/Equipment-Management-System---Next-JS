"use client";

import Navbar1 from "@/components/Navbar1";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

export default function Requests() {
    const [borrowedEquipment, setBorrowedEquipment] = useState([]);
    const [filteredEquipment, setFilteredEquipment] = useState([]); // For search results
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRequest, setSelectedRequest] = useState(null); // For the modal

    // Fetch equipment data and filter by status "borrowed"
    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await fetch("/api/technician-requests", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch equipment data.");
                }

                const data = await response.json();

                // Filter and group borrowed equipment by borrower ID and name
                const grouped = {};
                data
                    .filter((item) => item.status === "borrowed") // Filter by status
                    .forEach((item) => {
                        const key = `${item.borid}-${item.borname}`;
                        if (!grouped[key]) {
                            grouped[key] = {
                                borid: item.borid,
                                borname: item.borname,
                                timestamp: item.timestamp,
                                bordate: item.bordate,
                                retdate: item.retdate,
                                purpose_of_use: item.purpose_of_use,
                                used_out_campus: item.used_out_campus,
                                lecapp: item.lecapp,
                                hodapp: item.hodapp,
                                equipment: [],
                            };
                        }
                        grouped[key].equipment.push({ id: item.id, name: item.name });
                    });

                const groupedData = Object.values(grouped);
                setBorrowedEquipment(groupedData);
                setFilteredEquipment(groupedData); // Initialize filtered data
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
        setFilteredEquipment(filtered);
    };

    // Handle Issue/Reject actions
    const handleAction = async (equipmentId, action) => {
        try {
            const response = await fetch("/api/technician-requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: equipmentId, action }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update equipment.");
            }

            alert(`Equipment ${action} successfully.`);

            // Update local state
            const updatedEquipment = borrowedEquipment.filter(
                (item) => item.borid !== selectedRequest.borid
            );
            setBorrowedEquipment(updatedEquipment);
            setFilteredEquipment(updatedEquipment); // Update filtered results
            setSelectedRequest(null); // Close the modal
        } catch (error) {
            console.error("Error updating equipment:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="bg-white flex float-start flex-col items-center justify-between h-screen font-[family-name:var(--font-geist-sans)]">
            {/* Navbar Component */}
            <Navbar1 />

            {/* Main Content */}
            <div className="flex items-start h-full mb-30 overflow-y-scroll w-screen justify-center">
                <div className="border border-gray-300 w-screen mx-2 md:mx-10 lg:mx-40 xl:mx-60 px-2 py-2 mt-10">
                    <div className="items-left justify-between flex flex-col md:flex-row h-auto w-auto my-5">
                        <p className="text-3xl font-bold text-blue-950">Requests</p>
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

                    {/* Requests Table */}
                    <table className="w-full border-collapse border-b border-gray-300 mt-3 md:mt-5 lg:mt-10 overflow-x-auto">
                        <thead>
                            <tr className="border-b border-gray-200 font-extrabold text-gray-600">
                                <th className="py-5 px-2 md:px-5 text-left">Time of Request</th>
                                <th className="py-5 px-2 md:px-5 text-left">Student ID</th>
                                <th className="py-5 px-2 md:px-5 text-left">Student Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEquipment.length > 0 ? (
                                filteredEquipment.map((item, index) => (
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
                                        colSpan="3"
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
                            {selectedRequest.equipment
                                .map((eq) => `${eq.name} (ID: ${eq.id})`)
                                .join(", ")}
                        </p>
                        <p className="mb-2">
                            <strong>Status:</strong> Borrowed
                        </p>
                        <p className="mb-2">
                            <strong>Borrowing Date:</strong> {selectedRequest.bordate}
                        </p>
                        <p className="mb-2">
                            <strong>Return Date:</strong> {selectedRequest.retdate}
                        </p>
                        <p className="mb-2">
                            <strong>Purpose of Use:</strong> {selectedRequest.purpose_of_use}
                        </p>
                        <p className="mb-2">
                            <strong>Used Out of Campus:</strong> {selectedRequest.used_out_campus}
                        </p>
                        <p className="mb-2">
                            <strong>Lecturer Approval:</strong> {selectedRequest.lecapp}
                        </p>
                        <p className="mb-4">
                            <strong>HOD Approval:</strong> {selectedRequest.hodapp}
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() =>
                                    handleAction(selectedRequest.equipment[0].id, "issued")
                                }
                                className={`${
                                    selectedRequest.lecapp === "approved" &&
                                    selectedRequest.hodapp === "approved"
                                        ? "bg-blue-950 text-white"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                } px-4 py-2 rounded-md`}
                                disabled={
                                    !(
                                        selectedRequest.lecapp === "approved" &&
                                        selectedRequest.hodapp === "approved"
                                    )
                                }
                            >
                                Issue
                            </button>
                            <button
                                onClick={() =>
                                    handleAction(selectedRequest.equipment[0].id, "available")
                                }
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