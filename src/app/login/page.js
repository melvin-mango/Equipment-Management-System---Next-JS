import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function BorrowRequest() {
    return ( 
        <div className=" bg-white flex  flex-col  items-center justify-between h-screen font-[family-name:var(--font-geist-sans)]">
            {/*   Main content */}
            <div className="flex items-center h-full mb-30  w-screen  justify-center overflow-scroll">
                <div className="border border-gray-300 w-screen md:w-3/4 lg:w-1/2 xl:w-1/3 mx-2 md:mx-10 lg:mx-40 xl:mx-60 px-2 py-2 md:px-10 md:py-10 mt-10">
                    <p className="text-3xl font-bold text-blue-950">Login Page</p>
                    <form className="w-full mt-5 text-black">
                        <div className="flex flex-col mb-5">
                        <label className="text-lg mb-2">Email</label>
                        <input type="email" className="w-full h-10 border px-2 border-gray-300 rounded-md" placeholder="Enter school email"></input>
                        </div>
                        <div className="flex flex-col mb-5">
                        <label className="text-lg mb-2">Password</label>
                        <input type="password" className="w-full h-10 border px-2 border-gray-300 rounded-md" placeholder="Enter your password"></input>
                        </div>
                        <button className="bg-blue-950 w-full text-white px-4 py-2 rounded-md hover:bg-indigo-950">Sign In</button>
                        <p className=" mt-4">Don&apos;t have an account? <a href="/signup" className="text-blue-500">Sign Up</a></p>
                    </form>
                   
                </div>
            </div>
              {/*  Footer Component  */}
            <Footer />
        </div>
     )
}