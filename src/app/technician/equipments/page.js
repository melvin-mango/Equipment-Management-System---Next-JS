import Navbar1 from "@/components/Navbar1";
import Footer from "@/components/Footer";

{/* Equipments Page  */}

export default function Equipments() {
    return ( 
        <div className=" bg-white flex float-start flex-col  items-center justify-between h-screen font-[family-name:var(--font-geist-sans)]">
            {/*   Navbar component */}
                    <Navbar1 />
                    {/*   Main content */}
                    <div className="flex items-start h-full mb-30  w-screen  justify-center">
                        <div className="border border-gray-300 w-screen mx-2 md:mx-10 lg:mx-40 xl:mx-60 px-2 py-2 mt-10">
                            <p className="text-3xl font-bold text-blue-950 mb-10">Equipments</p>
                            {/*  Button for add equipment modal  */}
                            <label htmlFor="add-equipment-modal" className="bg-blue-950 text-white px-4 py-2  rounded-md cursor-pointer">Add Equipment </label>
                            
                            {/*  Equipment Table  */}
                            <table className="w-full border-collapse border-b border-gray-300 mt-3 md:mt-5 lg:mt-10 overflow-x-auto ">
                                <thead>
                                    <tr className="border-b border-gray-200 font-extrabold text-gray-600">
                                        <th className="py-5 px-2 md:px-5 md:py-5 text-left">Item</th>
                                        <th className="py-5 px-2 md:px-5 md:py-5 text-left">Serial Number</th>
                                    </tr>
                                </thead>
                                <tbody> 
                                     {/*  Implement logic for displaying equipment records. Currently using dummy hard coded data  */}        
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-5 px-2 md:px-5 md:py-5 text-left text-black font-semibold">Computer</td>
                                    <td className="py-5 px-2 md:px-5 md:py-5 text-left text-black font-semibold">Available</td>
                                </tr>
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-5 px-2 md:px-5 md:py-5 text-left text-black font-semibold">Computer</td>
                                    <td className="py-5 px-2 md:px-5 md:py-5 text-left text-black font-semibold">Available</td>
                                </tr>
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-5 px-2 md:px-5 md:py-5 text-left text-black font-semibold">Computer</td>
                                    <td className="py-5 px-2 md:px-5 md:py-5 text-left text-black font-semibold">Available</td>
                                </tr>
                                </tbody>
                            </table>

                            {/*  End of equipment table  */}

                            {/*  Add Equipment Modal   */}
                            <input type="checkbox" id="add-equipment-modal" className="hidden peer" />
                            <div className="fixed inset-0 bg-black bg-opacity-50 hidden peer-checked:flex items-center justify-center">
                                 <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg">
                                 {/*  Close Button  */}
                                 <div className="flex justify-end ">
                                    <label htmlFor="add-equipment-modal" className="text-gray-600 hover:text-gray-900 text-4xl cursor-pointer">&times;</label>
                                 </div>

                                     <h2 className="text-xl font-bold text-blue-950 mb-6">Add New Equipment</h2>

                                     {/*  Form for adding equipment  */}
                                     <form className="flex flex-col gap-6">
                
                <div>
                    <label className="block text-black mb-2">Equipment Name</label>
                    <input type="text" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950" placeholder="Enter equipment name" />
                </div>

               
                <div>
                    <label className="block text-black mb-2">Serial Number</label>
                    <input type="text" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950" placeholder="Enter serial number" />
                </div>

               
                <button className="bg-blue-950 text-white py-2 rounded-md hover:bg-indigo-950">
                    Add Equipment
                </button>
            </form>

            {/*  End of form  */}

            
            
        </div>
    </div>

    {/*  End of add equipment modal  */}
                        </div>
                    </div>

                    {/*  Footer Component  */}
                    <Footer/>
                </div>
     )
}