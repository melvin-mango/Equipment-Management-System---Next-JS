import Navbar1 from "@/components/Navbar1";
import Footer from "@/components/Footer";
{/* Dashboard Page   */}

export default function Dashboard() {
    return ( 
        <div className=" bg-white flex float-start flex-col w-screen  items-center justify-between h-screen font-[family-name:var(--font-geist-sans)]">
            {/*   Navbar component */}
            <Navbar1 />
            {/*   Main content */}
            <div className="w-full z-0 flex overflow-y-scroll flex-col float-start  items-center h-full">
                
                {/*  Main content text  */}
                <div className="border border-gray-300 w-11/12 mx-2 p-2 md:p-7 mt-10 md:mt-20 ">
                    <p className="text-3xl font-bold text-blue-950">Management Dashboard</p>

                    <p className="text-large font-medium mt-4 text-black">Welcome to the Equipment Borrowing System. Here, you can view available equipment, submit requests, and track approvals.</p>
                   
                </div>

                {/*  Statistics representation of systems pending approvals, borrowed equipment, and upcoming returns */}
                <div className="mx-2 px-2 py-2 mt-10  flex flex-col w-11/12 space-y-6 md:space-y-10 items-center justify-around ">
                    <p className="text-3xl font-bold align- text-blue-950">WorkFlow</p>
                    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 min-w-full items-center justify-around drop-shadow-md ">
                        <div className="flex items-center justify-around space-y-3 py-2 w-full md:w-1/3  flex-col px-2  bg-blue-950">
                            <p className="text-lg font-bold text-white">Pending Approvals</p>
                            {/*  Implement logic to display actual fetched data  */}
                            <p className="text-2xl font-bold text-white">0</p>
                        </div>
                        <div className="flex items-center justify-around space-y-3 py-2 w-full md:w-1/3 flex-col px-2  bg-indigo-200 drop-shadow-md">
                            <p className="text-lg font-bold text-blue-950">Borrow Equipment</p>
                            {/*  Implement logic to display actual fetched data  */}
                            <p className="text-2xl font-bold text-blue-950 ">0</p>
                        </div>
                        <div className="flex items-center justify-around space-y-3 py-2 w-full md:w-1/3 flex-col px-2  bg-blue-950 bg-opacity-70 drop-shadow-md">
                            <p className="text-lg font-bold text-white">Upcoming Returns</p>
                            {/*  Implement logic to display actual fetched data  */}
                            <p className="text-2xl font-bold text-white">0</p>
                        </div>
                    </div>
                </div>
                
            </div>
              {/*  Footer Component  */}
            <Footer />
        </div>
     )
}