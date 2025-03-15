import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

{/*  Borrow Request page  */}
export default function BorrowRequest() {
    return ( 
        <div className=" bg-white flex float-start flex-col  items-center justify-between h-screen font-[family-name:var(--font-geist-sans)]">
            {/*   Navbar component */}
            <Navbar />
            {/*   Main content */}
            <div className="flex items-start h-full mb-30  w-screen  justify-center overflow-scroll">
                <div className="border border-gray-300 w-screen mx-2 md:mx-10 lg:mx-40 xl:mx-60 px-2 py-2 mt-10">
                    <p className="text-3xl font-bold text-blue-950">Borrow Requests</p>
                    {/*  Form for sending a borrow request  */}
                    <form className="w-full mt-5 text-black">
                        <div className="flex flex-col mb-5">
                        <label className="text-lg mb-2">Equipments Selected</label>
                        <output className="w-full h-28 border p-2 border-gray-300 rounded-md">Tripod, Microphone</output>
                        </div>
                        <div className="flex flex-col mb-5">
                        <label className="text-lg mb-2">Purpose of use</label>
                        <input type="text" className="w-full h-10 border px-2 border-gray-300 rounded-md"></input>
                        </div>
                        <div className="flex flex-col mb-5">
                        <label className="text-lg mb-2">Borrowing Date</label>
                        <input type="date" className="w-full h-10 border px-2 border-gray-300 rounded-md"></input>
                        </div>
                        <div className="flex flex-col mb-5">
                        <label className="text-lg mb-2">Return Date</label>
                        <input type="date" className="w-full h-10 border px-2 border-gray-300 rounded-md"></input>
                        </div>
                        <div className="flex mb-5">
                        <label className="text-lg mb-2">Will the equipment(s) above be used in campus?</label>
                        <input type="checkbox" className=" w-5 h-5 border my-1 mx-2 border-gray-300 rounded-md"></input>
                        </div>
                        <button type="submit" className="bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-indigo-950">Submit Request</button>
                    </form>
                   
                </div>
            </div>
              {/*  Footer Component  */}
            <Footer />
        </div>
     )
}