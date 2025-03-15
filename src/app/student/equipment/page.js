import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

{/*  Equipment page for students  */}
export default function Equipment() {
    return ( 
        <div className=" bg-white flex float-start flex-col  items-center justify-between h-screen font-[family-name:var(--font-geist-sans)]">
            {/*   Navbar component */}
            <Navbar />
            {/*   Main content */}
            <div className="flex items-start h-full mb-30  w-screen  justify-center">
                <div className="border border-gray-300 w-screen mx-2 md:mx-10 lg:mx-40 xl:mx-60 px-2 py-2 mt-10">
                    <p className="text-3xl font-bold text-blue-950">Available Equipment</p>
                     {/*  Equipment table  */}
                    <table className="w-full border-collapse border-b border-gray-300 mt-3 md:mt-5 lg:mt-10 overflow-x-auto ">
                        <thead>
                            <tr className=" border-b border-gray-200 font-extrabold text-gray-600">
                                <th className="py-5 px-1 md:px-5 text-left">Item</th>
                                <th className="py-5 px-1 md:px-5  text-left">Status</th>
                                <th className="py-5 px-1 md:px-5 text-center ">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                             {/*  Implement logic for displaying equipment records. Currently using dummy hard coded data  */}
                        <tr className="border-b border-gray-200 font-extrabold hover:bg-gray-100">
                            <td className="py-5 px-1 md:px-5 text-left text-black font-semibold">Computer</td>
                            <td className="py-5 px-1 md:px-5 text-left text-black font-semibold">Available</td>
                            <td className="py-5 px-1 md:px-5 text-center font-semibold">
                                <button className="bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-indigo-950">Select</button>
                             </td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-5 px-1 md:px-5 text-left text-black font-semibold">Tripod</td>
                            <td className="py-5 px-1 md:px-5 text-left text-black font-semibold">Unavailable</td>
                            <td className="py-5 px-1 md:px-5 text-center font-semibold">
                                <button className="bg-indigo-200 text-gray-400 px-4 py-2 rounded-md cursor-not-allowed">Select</button>
                             </td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-5 px-1 md:px-5 text-left text-black font-semibold">Microphone</td>
                            <td className="py-5 px-1 md:px-5 text-left text-black font-semibold">Available</td>
                            <td className="py-5 px-1 md:px-5 text-center">
                                <button className="bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-indigo-950">Select</button>
                             </td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-5 px-1 md:px-5 text-left text-black font-semibold">Projector</td>
                            <td className="py-5 px-1 md:px-5 text-left text-black font-semibold">Unavailable</td>
                            <td className="py-5 px-1 md:px-5 text-center font-semibold">
                                <button className="bg-indigo-200 text-gray-400 px-4 py-2 rounded-md cursor-not-allowed">Select</button>
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