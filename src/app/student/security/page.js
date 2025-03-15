//import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

{/*  Security Check Page  */}

export default function Security() {
    /*const [qrSrc, setQrSrc] = useState("");

    useEffect(() => {
        // Replace 'your-data' with actual data you want in QR code
        const qrUrl = `http://127.0.0.1:8000/api/qrcode/your-data`;
        setQrSrc(qrUrl);
    }, []);*/
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