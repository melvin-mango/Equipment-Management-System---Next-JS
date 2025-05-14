"use client";
//import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useSelectedItems } from "@/context/SelectedItemsContext";
import { useState, useEffect } from "react";

{/*  Security Check Page  */}

export default function Security() {

    const router = useRouter();
    const [user, setUser] = useState(null);
    /*const [qrSrc, setQrSrc] = useState("");



    

    useEffect(() => {
        // Replace 'your-data' with actual data you want in QR code
        const qrUrl = `http://127.0.0.1:8000/api/qrcode/your-data`;
        setQrSrc(qrUrl);
    }, []);*/

    

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

        if (!user) {
            return (
                <div className="flex items-center justify-center h-screen">
                    <p>Loading user information...</p>
                </div>
            );
        }


    return ( 
        <div className=" bg-white flex float-start flex-col  items-center justify-between h-screen font-[family-name:var(--font-geist-sans)]">
            {/*   Navbar component */}
            <Navbar />
            {/*   Main content */}
            <div className="flex items-start h-full mb-30  w-screen  justify-center overflow-scroll">
                <div className="border border-gray-300 w-screen mx-2 md:mx-10 lg:mx-40 xl:mx-60 px-2 py-2 mt-10">
                    <p className="text-3xl font-bold text-blue-950">Security check</p>
                    {/*  Display QR code here  */}
                   {/* {qrSrc && (
                        <div className="flex justify-center mt-5">
                            <img src={qrSrc} alt="QR Code" className="w-40 h-40" />
                        </div>
                    )}*/}
                </div>
            </div>
              {/*  Footer Component  */}
            <Footer />
        </div>
     )
}