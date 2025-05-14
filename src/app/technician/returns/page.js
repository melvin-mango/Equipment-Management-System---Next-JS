"use client";
import Navbar1 from "@/components/Navbar1";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

export default function Returns() {
    const [modalData, setModalData] = useState([]); // State to hold modal data
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [equipmentData, setEquipmentData] = useState([]); // State to hold all equipment data

    // Fetch all equipment data from the API
    useEffect(() => {
        const fetchEquipmentData = async () => {
            try {
                const response = await fetch("/api/returns", {
                    method: "GET",
                });
                const data = await response.json();
                if (response.ok) {
                    // Flatten the equipment data into a single array
                    const flattenedData = Object.values(data).flat();
                    setEquipmentData(flattenedData);
                } else {
                    console.error("Error fetching equipment data:", data.error);
                }
            } catch (error) {
                console.error("Error fetching equipment data:", error);
            }
        };

        fetchEquipmentData();
    }, []);

    const handleStudentClick = (studentName) => {
        // Find all borrowed equipment for the student with the same timestamp, purpose_of_use, and borid
        const borrowedEquipment = equipmentData.filter(
            (item) =>
                item.borname === studentName &&
                item.status === "issued"
        );

        setModalData(borrowedEquipment);
        setIsModalOpen(true);
    };

    const handleReturn = async () => {
        if (modalData.length > 0) {
            const { borname, timestamp } = modalData[0]; // Use the first item's student name and timestamp

            try {
                const response = await fetch("/api/returns", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ studentName: borname, timestamp }),
                });

                const result = await response.json();

                if (response.ok) {
                    console.log(result.message); // Log success message
                    setIsModalOpen(false); // Close the modal
                    // Refresh equipment data after return
                    const updatedEquipmentData = equipmentData.map((item) =>
                        item.timestamp === timestamp && item.borname === borname
                            ? { ...item, status: "available" }
                            : item
                    );
                    setEquipmentData(updatedEquipmentData);
                } else {
                    console.error(result.error); // Log error message
                }
            } catch (error) {
                console.error("Error communicating with the API:", error);
            }
        }
    };

    return (
        <div className="bg-white flex flex-col items-center justify-between h-screen font-[family-name:var(--font-geist-sans)]">
            <Navbar1 />
            <div className="flex items-start h-full mb-30 overflow-y-scroll w-screen justify-center">
                <div className="border border-gray-300 w-screen mx-2 md:mx-10 lg:mx-40 xl:mx-60 px-2 py-2 mt-10">
                    <div className="items-left justify-between flex flex-col md:flex-row h-auto w-auto my-5">
                        <p className="text-3xl font-bold text-blue-950">Upcoming Returns</p>
                    </div>

                    {/* Returns table */}
                    <table className="w-full border-collapse border-b border-gray-300 mt-3 md:mt-5 lg:mt-10 overflow-x-auto">
                        <thead>
                            <tr className="border-b border-gray-200 font-extrabold text-gray-600">
                                <th className="py-5 px-2 md:px-5 text-left">Student ID</th>
                                <th className="py-5 px-2 md:px-5 text-left">Student Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipmentData
                                .filter((item) => item.status === "issued")
                                .map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleStudentClick(item.borname)}
                                    >
                                        <td className="py-5 px-2 md:px-5 text-left text-black font-semibold">
                                            {item.borid}
                                        </td>
                                        <td className="py-5 px-2 md:px-5 text-left text-blue-600 font-semibold underline">
                                            {item.borname}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-lg w-3/4 md:w-1/2">
                        <h2 className="text-2xl font-bold mb-4">Borrowed Equipment</h2>
                        <p><strong>Purpose of Use:</strong> {modalData[0]?.purpose_of_use}</p>
                        <p><strong>Borrowed By:</strong> {modalData[0]?.borname}</p>
                        <p><strong>Borrow ID:</strong> {modalData[0]?.borid}</p>
                        <p><strong>Timestamp:</strong> {modalData[0]?.timestamp}</p>
                        <p><strong>Equipment:</strong></p>
                        <ul className="list-disc pl-5">
                            {modalData.map((item, index) => (
                                <li key={index}>
                                    {item.name} ({item.id})
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={handleReturn}
                            className="bg-green-800 text-white px-4 py-2 rounded-md mt-4"
                        >
                            Returned
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-red-800 text-white px-4 py-2 rounded-md mt-4 ml-2"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}