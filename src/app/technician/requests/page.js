import Navbar1 from "@/components/Navbar1";
import Footer from "@/components/Footer";

{/*  Requests page  */}

export default function Requests() {
    return ( 
        <div className=" bg-white flex float-start flex-col  items-center justify-between h-screen font-[family-name:var(--font-geist-sans)]">
            {/*   Navbar component */}
        <Navbar1 />
        {/*   Main content */}
        <div className="flex items-start h-full mb-30  w-screen  justify-center">
            <div className="border border-gray-300 w-screen mx-2 md:mx-10 lg:mx-40 xl:mx-60 px-2 py-2 mt-10">
                <p className="text-3xl font-bold text-blue-950">Requests</p>

                {/*  Requests table  */}
                <table className="w-full border-collapse border-b border-gray-300 mt-3 md:mt-5 lg:mt-10 overflow-x-auto ">
                    <thead>
                        <tr className="border-b border-gray-200 font-extrabold text-gray-600">
                            <th className="py-5 px-2 md:px-5 text-left">Item</th>
                            <th className="py-5 px-2 md:px-5 text-left hidden lg:table-cell">Serial Number</th>
                            <th className="py-5 px-2 md:px-5 text-left">Student ID</th>
                            <th className="py-5 px-2 md:px-5 text-left">Status</th>
                            <th className="py-5 px-2 md:px-5 text-center hidden lg:table-cell">Lecturer</th>
                            <th className="py-5 px-2 md:px-5 text-center hidden lg:table-cell">HOD</th>
                            
                        </tr>
                    </thead>
                    <tbody>

                        {/*  Implement logic for displaying requests records. Currently using dummy hard coded data  */}
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-5 px-2 md:px-5 text-left text-black font-semibold">Tripod Stand</td>
                        <td className="py-5 px-2 md:px-5 text-left text-black font-semibold hidden lg:table-cell">42503240242</td>
                        <td className="py-5 px-2 md:px-5 text-left text-black font-semibold">666666</td>
                        <td className="py-5 px-2 md:px-5 text-left text-black font-semibold">Approved</td>
                        <td className="py-5 px-2 md:px-5 text-center text-black font-semibold hidden lg:table-cell">
                            <p className="bg-blue-950 text-white px-4 py-2 rounded-md">Approved</p>
                        </td>
                        <td className="py-5 px-2 md:px-5 text-center text-black font-semibold hidden lg:table-cell">
                        <p className="bg-blue-950 text-white px-4 py-2 rounded-md">Approved</p>
                        </td>
                        
                    </tr>

                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-5 px-2 md:px-5 text-left text-black font-semibold">Cannon Camera</td>
                        <td className="py-5 px-2 md:px-5 text-left text-black font-semibold hidden lg:table-cell">24424213423</td>
                        <td className="py-5 px-2 md:px-5 text-left text-black font-semibold">666666</td>
                        <td className="py-5 px-2 md:px-5 text-left text-black font-semibold">Denied</td>
                        <td className="py-5 px-2 md:px-5 text-center text-black font-semibold hidden lg:table-cell">
                        <p className="bg-indigo-200 text-blue-950 px-4 py-2 rounded-md">Pending</p>
                        </td>
                        <td className="py-5 px-2 md:px-5 text-center text-black font-semibold hidden lg:table-cell">
                            <p className="bg-indigo-200 text-blue-950 px-4 py-2 rounded-md">Pending</p>
                        </td>
                        
                    </tr>

                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-5 px-2 md:px-5 text-left text-black font-semibold">Microphone</td>
                        <td className="py-5 px-2 md:px-5 text-left text-black font-semibold hidden lg:table-cell">75373624567</td>
                        <td className="py-5 px-2 md:px-5 text-left text-black font-semibold">666666</td>
                        <td className="py-5 px-2 md:px-5 text-left text-black font-semibold">Denied</td>
                        <td className="py-5 px-2 md:px-5 text-center text-black font-semibold hidden lg:table-cell">
                            <p className="bg-blue-950 text-white px-4 py-2 rounded-md">Approved</p>
                        </td>
                        <td className="py-5 px-2 md:px-5 text-center text-black font-semibold hidden lg:table-cell">
                            <p className="bg-indigo-200 text-blue-950 px-4 py-2 rounded-md">Pending</p>
                        </td>
                        
                    </tr>
                   

                    </tbody>
                </table>
            </div>
        </div>
          {/*  Footer Component  */}
        <Footer />
    </div>
     )
}