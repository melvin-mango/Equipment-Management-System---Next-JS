"use client";

import { useSelectedItems } from "@/context/SelectedItemsContext";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



export default function Equipment() {
    const { selectedItems, setSelectedItems } = useSelectedItems(); // Use context for selected items
    const [equipmentData, setEquipmentData] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("");
    const [displayedEquipment, setDisplayedEquipment] = useState([]);
    const router = useRouter();
    const [user, setUser] = useState(null);
    
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
    
                setUser({ id: decoded.id, name: decoded.name });
            } catch (error) {
                console.error("Failed to decode token:", error);
                router.push("/login"); // Redirect to login if token is invalid
            }
        } else {
            console.error("Token not found");
            router.push("/login"); // Redirect to login if token is missing
        }
    }, [router]);

    // Fetch equipment data from the API
    useEffect(() => {
        const fetchEquipmentData = async () => {
            try {
                const response = await fetch("/api/equipment");
                const data = await response.json();
                setEquipmentData(data);
            } catch (error) {
                console.error("Failed to fetch equipment data:", error);
            }
        };
        fetchEquipmentData();
    }, []);



    // Display equipment based on the selected category
    const displayEquipment = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);

        if (category && equipmentData[category]) {
            setDisplayedEquipment(equipmentData[category]);
        } else {
            setDisplayedEquipment([]);
        }
    };

    // Handle checkbox selection
    const handleCheckboxChange = (item) => {
        if (selectedItems.some((selected) => selected.id === item.id)) {
            // Remove the item if already selected
            setSelectedItems(selectedItems.filter((selected) => selected.id !== item.id));
        } else {
            // Add the item to the selected items array
            setSelectedItems([...selectedItems, item]);
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
            <div className="flex items-start h-full mb-30 overflow-y-scroll w-screen justify-center">
                <div className="border border-gray-300 w-screen mx-2 md:mx-10 lg:mx-40 xl:mx-60 px-2 py-2 mt-10">
                    <div className="items-left justify-between flex flex-col md:flex-row h-auto w-auto my-5">
                        <p className="text-3xl font-bold text-blue-950 mb-10">Equipments</p>
                    </div>
                    <form className="mt-10">
                        <label>
                            <p className="text-black mb-3">Select a Category</p>
                            <select
                                value={selectedCategory}
                                onChange={displayEquipment}
                                className="w-34 h-10 border text-black border-black rounded-md"
                            >
                                <option value="">Select an equipment category</option>
                                {Object.keys(equipmentData).map((category) => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </label>

                        {/* Equipment Table */}
                        <table className="w-full border-collapse border-b border-gray-300 text-black mt-3 md:mt-5 lg:mt-10 overflow-x-auto">
                            <thead>
                                <tr className="border-b border-gray-200 font-extrabold text-gray-600">
                                    <th className="py-5 px-2 md:px-5 md:py-5 text-left">Item</th>
                                    <th className="py-5 px-2 md:px-5 md:py-5 text-left">Serial Number</th>
                                    <th className="py-5 px-2 md:px-5 md:py-5 text-left">Status</th>
                                    <th className="py-5 px-2 md:px-5 md:py-5 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedEquipment.length > 0 ? (
                                    displayedEquipment.map((item) => (
                                        <tr key={item.id} className="border-b border-gray-200">
                                            <td className="py-3 px-2 md:px-5">{item.name}</td>
                                            <td className="py-3 px-2 md:px-5">{item.id}</td>
                                            <td className="py-3 px-2 md:px-5">{item.status}</td>
                                            <td className="py-3 px-2 md:px-5 space-y-2 flex flex-col justify-center lg:flex-row lg:space-y-0">
                                                <input
                                                    type="checkbox"
                                                    disabled={item.status !== "available"} // Disable if not available
                                                    onChange={() => handleCheckboxChange(item)}
                                                    checked={selectedItems.some((selected) => selected.id === item.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-5">
                                            No equipment available for the selected category.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}