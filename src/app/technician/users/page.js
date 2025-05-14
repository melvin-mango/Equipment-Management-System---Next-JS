"use client";
import Navbar1 from "@/components/Navbar1";
import Footer from "@/components/Footer";

import {useState, useEffect} from "react";

{/*   Returns page */}
export default function Users() {
    const [userData, setUserData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [displayedUser, setDisplayedUser] = useState([]); 
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState({id:"", fname:"", email:"", password:"", role:""});
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for Add User Modal
    const [newUser, setNewUser] = useState({ id: "", fname: "", email: "", password: "", role: "" }); // State for new user
    

    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const response = await fetch ("/api/user"); 
                const data= await response.json();
                setUserData(data);
                setDisplayedUser(data); 
            } catch(error) {
                console.error("Failed to fetch users data",error);
            }
        };
        fetchUserData();
    },[])

    useEffect (()=>{
        console.log("Modal Open State", isEditModalOpen);
    },[isEditModalOpen])

    const addUser = async () => {
        if (!newUser.id.trim() || !newUser.fname.trim() || !newUser.email.trim() || !newUser.password.trim() || !newUser.role.trim()) {
            alert("Please fill in all fields.");
            return;
        }
    
        try {
            const response = await fetch("/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });
    
            if (response.ok) {
                const addedUser = await response.json();
                setDisplayedUser([...displayedUser, addedUser]); // Update the displayed users
                setNewUser({ id: "", fname: "", email: "", password: "", role: "" }); // Clear the form
                setIsAddModalOpen(false); // Close the modal
                alert("User added successfully.");
            } else {
                console.error("Failed to add user.");
                alert("Failed to add user. Please try again.");
            }
        } catch (error) {
            console.error("Error adding user:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    };
    const editUser =  (id) => {
        const users = displayedUser.find((item) => item.id === id);
        console.log("Editing User:", users);
        if(users) {
            setUserToEdit(users);
            setNewPassword("");
            setConfirmPassword("");
            setShowPassword(false);
            setIsEditModalOpen(true);
        } else{
            console.log("user not found",error);
        }
    };
    const deleteUser = async (id) => {
        
        const userToDelete = displayedUser.find((user) => user.id === id);

        if(!userToDelete){
            alert("User not found");
            return;
        }

        const confirmDelete = window.confirm(`Are you sure you want to delete ${userToDelete.fname}?`);

        if(confirmDelete){
            try{

                const response = await fetch("/api/user",
                    {
                        method:"DELETE",
                        headers:{"Content-Type": "application/json"},
                        body: JSON.stringify({id}),
                    }
                );

                console.log("API Response", response)

                if (response.ok){
                    const updateduser = displayedUser.filter((user) => user.id !== id);
                    setDisplayedUser(updateduser);
                    alert("User deleted successfully");
                } else{
                    alert("Failed to delete user.");
                    console.error("Failed to delete user");
                } 

            } catch(error){
                console.error("Failed to delete user",error);
            }
        }
    };
    const handleEditUser = async (e) => {
        e.preventDefault();
        
        const finalPassword = newPassword || userToEdit.password; 

        if(newPassword !== confirmPassword){
            alert("Passwords do not match. Please try again.");
            return;
        }
        const confirmEdit = window.confirm("Are you sure you want to save the changes made?");
        if (confirmEdit){
            try{
                const response = await fetch("/api/user", {
                    method:"PUT",
                    headers:{"Content-Type" : "application/json"},
                    body: JSON.stringify({
                        id: userToEdit.id,
                        updatedUser: {...userToEdit, password: finalPassword},
                        
                    }),
                });

                if(response.ok){
                    const updatedUser = 
                    displayedUser.map((user) => user.id === userToEdit.id ? {...userToEdit, password: finalPassword} : user);

                    setDisplayedUser(updatedUser);
                    setIsEditModalOpen(false);
                    alert("User has been updated successfully"); 
                }else{
                    console.error("Error updating user"); 
                }
            } catch(error){
                console.error("Error updating user");
            }
        }
    };
    const handleSearch =  (e) => {
        const query = e.target.value; 
        setSearchQuery(query);

        if (query.trim() === ""){
            setDisplayedUser(userData);
        }else {
            const filteredUser = userData.filter((user) => 
            user.id.toLowerCase().includes(query.toLowerCase())|| 
            user.fname.toLowerCase().includes(query.toLowerCase())||
            user.email.toLowerCase().includes(query.toLowerCase())||
            user.role.toLowerCase().includes(query.toLowerCase()) );
            setDisplayedUser(filteredUser);
        }

    };
    const handleAddUser = async (e) => {};
    



    return ( 
        <div className=" bg-white flex float-start flex-col  items-center justify-between h-screen font-[family-name:var(--font-geist-sans)]">
            {/*   Navbar component */}
            <Navbar1 />
            {/*   Main content */}
            <div className="flex items-start h-full mb-30 overflow-y-scroll  w-screen  justify-center">
                <div className="border border-gray-300 w-screen mx-2 md:mx-10 lg:mx-40 xl:mx-60 px-2 py-2 mt-10">
                    <div className="items-left justify-between flex flex-col md:flex-row h-auto w-auto my-5"> 
                        <p className="text-3xl font-bold text-blue-950">System Users</p> 
                        <div className="mt-5 md:mt-0">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleSearch(e);
                            }}>
                                <label className="space-x-5">
                                <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearch} className="w-[150px] md:w-[300px] xl:w-[400px] text-black px-4 py-2 h-10 border border-black rounded-md"/>
                                <input type="submit" value="Search" className="bg-blue-950 cursor-pointer text-white px-4 py-2 rounded-md"/>
                                </label>
                            </form>
                        </div>
                    </div>

                    <button
    onClick={() => setIsAddModalOpen(true)} // Open the modal
    className="bg-blue-950 text-white px-4 py-2 rounded-md cursor-pointer"
>
    Add User
</button>
                   

                     {/*  Returns table  */}
                     <table className="w-full border-collapse border-b border-gray-300 text-black mt-3 md:mt-5 lg:mt-10 overflow-x-auto ">
                    <thead>
                        <tr className="border-b border-gray-200 font-extrabold text-gray-600">
                            <th className="py-5 px-2 md:px-5 text-left  hidden lg:table-cell">ID</th>
                            <th className="py-5 px-2 md:px-5 text-left hidden lg:table-cell">Name</th>
                            <th className="py-5 px-2 md:px-5 text-left">Email</th>
                            <th className="py-5 px-2 md:px-5 text-left hidden lg:table-cell">Role</th>
                            <th className="py-5 px-2 md:px-5 text-center"> Action </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {/*  Implement logic for displaying requests records. Currently using dummy hard coded data  */}
                        {
                            displayedUser.length > 0 ? (
                                displayedUser.map((user) => (
                                    <tr key={user.id} className="border-b border-gray-200">
                                        <td className="py-5 px-2 md:px-5  hidden lg:table-cell">{user.id}</td>
                                        <td className="py-5 px-2 md:px-5  hidden lg:table-cell">{user.fname}</td>
                                        <td className="py-5 px-2 md:px-5">{user.email}</td>
                                        <td className="py-5 px-2 md:px-5  hidden lg:table-cell">{user.role}</td>
                                        <td className="py-3 px-2 md:px-5 flex justify-center space-x-4 space-y-0">
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                console.log("Button Is clicked");
                                                editUser(user.id);
                                            }
                                            } className="w-[80px] py-2 px-3 bg-blue-950 text-white rounded-md lg:mr-2">Edit</button>
                                            <button 
                                            onClick={
                                                (e) => {
                                                    e.preventDefault();
                                                    deleteUser(user.id);
                                                }
                                            }
                                            className="w-[80px] py-2 px-3 bg-red-800 text-white rounded-md">Delete</button>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-5">  Fetching Users...</td>
                              
                                </tr>
                            )
                            
                        }
                    </tbody>
                </table>

                {isAddModalOpen && (
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
            <h2 className="text-xl font-bold text-blue-950 mb-6">Add New User</h2>
            <form
                className="flex flex-col gap-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    addUser();
                }}
            >
                <div>
                    <label className="block text-black mb-2">Full Name</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                        placeholder="Enter full name"
                        value={newUser.fname}
                        onChange={(e) => setNewUser({ ...newUser, fname: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-black mb-2">School Email</label>
                    <input
                        type="email"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                        placeholder="Enter email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-black mb-2">School ID</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                        placeholder="Enter school ID"
                        value={newUser.id}
                        onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-black mb-2">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                        placeholder="Enter password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-black mb-2">Role</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                        placeholder="Enter role (e.g., student, lecturer)"
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-950 text-white py-2 rounded-md hover:bg-indigo-950"
                >
                    Add User
                </button>
            </form>
        </div>
    </div>
)}

    {
                isEditModalOpen && (
                    <>
                    {console.log("Rendering Modal")}
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex  items-center justify-center">
                        <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg">
                            <div className="flex justify-end">
                                <button onClick={() => setIsEditModalOpen(false)} className="text-gray-600 hover:text-gray-900 text-4xl cursor-pointer">&times;</button>
                            </div>
                            <h2 className="text-xl font-bold text-blue-950 mb-6">Edit User</h2>
                            <form className="flex flex-col gap-6" onSubmit={handleEditUser}>
                                <div>
                                    <label className="block text-black mb-2">School ID</label>
                                    <input className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 text-black" type="text" 
                                    value={userToEdit.id} onChange={(e) => setUserToEdit({...userToEdit, id:e.target.value})}/>
                                </div>
                                <div>
                                    <label className="block text-black mb-2">Full Name</label>
                                    <input className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 text-black"  type="text"
                                    value={userToEdit.fname} onChange={(e) => setUserToEdit({...userToEdit, fname:e.target.value})}/>
                                </div>
                                <div>
                                    <label className="block text-black mb-2">School Email</label>
                                    <input className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 text-black"  type="email"
                                    value={userToEdit.email} onChange={(e) => setUserToEdit({...userToEdit, email:e.target.value})}/>
                                </div>
                                <div>
                                    <label className="block text-black mb-2">Role</label>
                                    <input className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 text-black"  type="text"
                                    value={userToEdit.role} onChange={(e) => setUserToEdit({...userToEdit, role:e.target.value})}/>
                                </div>
                                <div>
                                    <label className="block text-black mb-2">New Password</label>
                                    <div className="relative">
                                    <input className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 text-black" 
                                    value={newPassword || userToEdit.password}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    type={showPassword ? "text" : "password"}/>
                                    <button
                                    type="button"
                                    className="absolute right-2 top-2 text-gray-600 hover:text-gray-900"
                                    onClick={()=> setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "Hide" : "Show"}</button>
                                    </div>
                                    
                                </div>
                                <div>
                                    <label className="block text-black mb-2">Confirm Password</label>
                                    <div className="relative">
                                    <input className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 text-black" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    type={showPassword ? "text" : "password"}/>
                                    <button
                                    type="button"
                                    className="absolute right-2 top-2 text-gray-600 hover:text-gray-900"
                                    onClick={()=> setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "Hide" : "Show"}</button>
                                    </div>
                                    
                                </div>
                                
                                <button type="submit" className="bg-blue-950 w-full mt-10 text-white py-2 rounded-md hover:bg-indigo-950" >Save Changes</button>
                                
                            </form>
                        </div>
                    </div>
                    </>
                )
            }
                </div>
            </div>
              {/*  Footer Component  */}
            <Footer />
        </div>
     )
}