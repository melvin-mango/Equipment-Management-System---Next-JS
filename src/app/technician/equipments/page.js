"use client";
import Navbar1 from "@/components/Navbar1";
import Footer from "@/components/Footer";

import { useState, useEffect } from "react";


{/* Equipments Page  */}

export default function Equipments() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [equipmentData, setEquipmentData] = useState({});
    const [displayedEquipment, setDisplayedEquipment] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [equipmentToEdit, setEquipmentToEdit] = useState({name:"", id:""});
    const [searchQuery, setSearchQuery] = useState("");
    const [newEquipment, setNewEquipment] = useState({ name: "", id: "", category: "" });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        const fetchEquipmentData = async () => {
            try {
                const response = await fetch("/api/equipment");
                const data = await response.json();
                setEquipmentData(data);
            } catch (error) {
                console.error("failed to fetch equipment data",error);
            }
        };
        fetchEquipmentData();
    },[])

    

    const addEquipment = async () => {
        if (!newEquipment.name.trim() || !newEquipment.id.trim() || !newEquipment.category.trim()) {
            alert("Please fill in all fields.");
            return;
        }
    
        const equipmentToAdd = {
            id: newEquipment.id,
            name: newEquipment.name,
            lecapp: "",
            hodapp: "",
            status: "available",
            retstatus: "",
            borid: "",
            borname: "",
            bordate: "",
            retdate: "",
            purpose_of_use: "",
            used_out_campus:""
        };
    
        try {
            const response = await fetch("/api/equipment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    category: newEquipment.category,
                    newItem: equipmentToAdd,
                }),
            });

            if (response.ok) {
                const updatedEquipment = [...displayedEquipment, equipmentToAdd];
                setDisplayedEquipment(updatedEquipment);
                setNewEquipment({ name: "", id: "", category: "" });
                setIsAddModalOpen(false); // Close the modal after adding equipment
                alert("Equipment added successfully.");
                window.location.reload();
            } else {
                console.error("Failed to add equipment.");
                alert("Failed to add equipment. Please try again.");
            }
        } catch (error) {
            console.error("Error adding equipment:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    };

    const displayEquipment = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);

        if(category && equipmentData[category]){
            setDisplayedEquipment(equipmentData[category]);
        }
        else {
            setDisplayedEquipment([]);
        }
    }

    const editEquipment = (id) => {
        const equipment = displayedEquipment.find((item) => item.id === id);
        if (equipment) {
            setEquipmentToEdit(equipment); // Set the equipment to edit
            setIsEditModalOpen(true); // Open the modal
        }
    };
    
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const confirmEdit = window.confirm("Are you sure you want to save the changes made?");
        if(confirmEdit){
            try{
                const response = await fetch("/api/equipment", {
                    method: "PUT", 
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({
                        id: equipmentToEdit.id,
                        category: selectedCategory,
                        updatedItem: equipmentToEdit, 
                    }),
                });

                if (response.ok){
                    const updatedEquipment = displayedEquipment.map((item) => item.id === equipmentToEdit.id? equipmentToEdit : item);

                    setDisplayedEquipment(updatedEquipment);
                    setIsEditModalOpen(false);
                    alert("Equipment Updated successfully");
                    window.location.reload();
                }
                else{
                    console.error("Failed to update equipment");

                }
            } catch (error){
                console.error("Error updating equipment:", error);
        } 
        }
    }

    const deleteEquipment = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this equipment?");
        if (confirmDelete) { 
            try {
                const response = await fetch("/api/equipment", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id, category: selectedCategory }),
                });
                console.log("API Response", response);
    
                if (response.ok) {
                    const updatedEquipment = displayedEquipment.filter((item) => item.id !== id);
                    setDisplayedEquipment(updatedEquipment);
                    alert("Equipment deleted successfully");
                    window.location.reload();
                    
                } else {
                    console.log("Failed to delete equipment");
                }
            } catch (error) {
                console.error("Error deleting equipment:", error);
            }
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (!selectedCategory){
            alert("Please select a category before searching");
            return;
        }

        if (query.trim() === ""){
            setDisplayedEquipment(equipmentData[selectedCategory]);

        } else{
            const filteredEquipment = equipmentData[selectedCategory].filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setDisplayedEquipment(filteredEquipment);

        }

        

        
    }

    return ( 
        <div className=" bg-white flex float-start flex-col  items-center justify-between h-screen font-[family-name:var(--font-geist-sans)]">
            {/*   Navbar component */}
                    <Navbar1 />
                    {/*   Main content */}
                    <div className="flex items-start h-full mb-30  overflow-y-scroll w-screen  justify-center">
                        <div className="border border-gray-300 w-screen mx-2 md:mx-10 lg:mx-40 xl:mx-60 px-2 py-2 mt-10">
                        <div className="items-left justify-between flex flex-col md:flex-row h-auto w-auto my-5"> 
                            <p className="text-3xl font-bold text-blue-950 mb-10">Equipments</p>
                            <div className="mt-5 md:mt-0">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleSearch(e);

                            }}>
                                <label className="space-x-5">
                                <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearch} className="w-[150px] md:w-[250px] xl:w-[400px] text-black px-4 py-2 h-10 border border-black rounded-md"/>
                                <input type="submit" value="Search" className="bg-blue-950 cursor-pointer text-white px-4 py-2 rounded-md"/>
                                </label>
                            </form>
                        </div>
                        </div>
                            {/*  Button for add equipment modal  */}
                            <button
                        onClick={() => setIsAddModalOpen(true)} // Open the modal
                        className="bg-blue-950 text-white px-4 py-2 rounded-md cursor-pointer"
                    >
                        Add Equipment
                    </button>

                            <form className="mt-10">

                             <label>
                                <p className="text-black mb-3">Select a Category</p>   
                            <select value={selectedCategory} onChange={displayEquipment} className="w-34 h-10 border text-black border-black rounded-md">
                                <option value="">Select an equipment category</option>
                                {Object.keys(equipmentData).map((category) => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                            </label>
                            
                            {/*  Equipment Table  */}
                            <table className="w-full border-collapse border-b border-gray-300 text-black mt-3 md:mt-5 lg:mt-10 overflow-x-auto ">
                                <thead>
                                    <tr className="border-b border-gray-200 font-extrabold text-gray-600">
                                        <th className="py-5 px-2 md:px-5 md:py-5 text-left">Item</th>
                                        <th className="py-5 px-2 md:px-5 md:py-5 text-left">Serial Number</th>
                                        <th className="py-5 px-2 md:px-5 md:py-5 text-left">Action</th>
                                    </tr>
                                </thead>
                                <tbody> 
                                     {/*  Implement logic for displaying equipment records. Currently using dummy hard coded data  */}
                                     {displayEquipment.length > 0 ? (
                                        displayedEquipment.map((item) => (
                                            <tr key={item.id} className="border-b border-gray-200">
                                                <td className="py-3 px-2 md:px-5">{item.name}</td>
                                                <td className="py-3 px-2 md:px-5">{item.id}</td>
                                                <td className="py-3 px-2 md:px-5 space-y-2 flex flex-col justify-center lg:flex-row lg:space-y-0  ">
                                                    <button className="w-[80px] py-2 px-3 bg-blue-950 text-white rounded-md lg:mr-2" onClick={(e) => {
                                                         e.preventDefault(); 
                                                        editEquipment(item.id);
                                                        }}>Edit</button>
                                                    <button className="w-[80px] py-2 px-3 bg-red-800 text-white rounded-md" onClick={(e) => {
                                                        e.preventDefault(); 
                                                        deleteEquipment(item.id);

                                                    }}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                     ) : (
                                        <tr>
                                        <td colSpan="3" className="text-center py-5">
                                            No equipment available for the selected category.
                                        </td>
                                    </tr>
                                     )}        
                               
                                </tbody>
                            </table>
                            </form>

                            {/*  End of equipment table  */}

                            {/*  Add Equipment Modal   */}
                            {
                                isAddModalOpen && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg">
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setIsAddModalOpen(false)} // Close the modal
                                        className="text-gray-600 hover:text-gray-900 text-4xl cursor-pointer"
                                    >
                                        &times;
                                    </button>
                                </div>
                                <h2 className="text-xl font-bold text-blue-950 mb-6">Add New Equipment</h2>
                                <form
                                    className="flex flex-col gap-6"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        addEquipment();
                                    }}
                                >
                                    <div>
                                        <label className="block text-black mb-2">Equipment Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                                            placeholder="Enter equipment name"
                                            value={newEquipment.name}
                                            onChange={(e) =>
                                                setNewEquipment({ ...newEquipment, name: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-black mb-2">Serial Number</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                                            placeholder="Enter serial number"
                                            value={newEquipment.id}
                                            onChange={(e) =>
                                                setNewEquipment({ ...newEquipment, id: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                    <label className="block text-black mb-2">Category</label>
                                        <select
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                                            value={newEquipment.category}
                                            onChange={(e) =>
                                                setNewEquipment({ ...newEquipment, category: e.target.value })
                                            }
                                        >
                                            <option value="">Select a category</option>
                                            {Object.keys(equipmentData).map((category) => (
                                                <option key={category} value={category}>
                                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-950 text-white py-2 rounded-md hover:bg-indigo-950"
                                    >
                                        Add Equipment
                                    </button>
                                </form>
                            </div>
                        </div>
                                )
                            }
    {/*  End of add equipment modal  */}

      {/*  Edit equipment modal  */}

      {
        isEditModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg">
                    <div className="flex justify-end">
                        <button
                        className="text-gray-600 hover:text-gray-900 text-4xl cursor-pointer"
                        onClick={() => setIsEditModalOpen(false)} 
                        >
                            &times;
                        </button>
                    </div>
                    <h2 className="text-xl font-bold text-blue-950 mb-6">Edit Equipment</h2>
                    <form className="flex flex-col gap-6" onSubmit={handleEditSubmit}>
                        <div>
                            <label className="block text-black mb-2">Equipment Name</label>
                            <input
                            type="text"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950  text-black"
                            value={equipmentToEdit.name}
                            onChange={(e) => 
                                setEquipmentToEdit({...equipmentToEdit, name: e.target.value})
                            } 
                            placeholder="Enter equipment name"
                            />
                        </div>
                        <div>
                            <label className="block text-black mb-2">Serial Number</label>
                            <input
                            type="text"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 text-black"
                            value={equipmentToEdit.id}
                            onChange={(e) => 
                                setEquipmentToEdit({...equipmentToEdit, id: e.target.value})
                            }
                            placeholder="Enter serial number"
                            />
                            <button
                            type="submit"
                            className="bg-blue-950 w-full mt-10 text-white py-2 rounded-md hover:bg-indigo-950"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
      }



    
                        </div>
                    </div>

                    {/*  Footer Component  */}
                    <Footer/>
                </div>
     )
}