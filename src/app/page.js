import Image from 'next/image';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className=" flex bg-white text-black flex-col  items-center  justify-between h-screen font-[family-name:var(--font-geist-sans)]">
      {/*   Navbar content */}
      <nav className="flex w-full justify-between items-center border-b-4 border-indigo-300 px-5 py-4 bg-indigo-200 lg:px-10 xl:px-36 2xl:px-80">

<Image src="/Logo.png" className='w-40 h-auto' alt="EMS Logo" width={200} height={100}/>

<div className="flex flex-col  space-y-4 w-28 md:flex-row md:space-y-0 md:space-x-4 items-center justify-between  md:w-60 ">
  
    <a href="/login" className="font-semibold px-6 py-2 rounded-md bg-blue-950 text-white text-center w-full md:w-1/2">Login</a>
 
    <a href="/signup" className="font-semibold px-6 py-2 rounded-md bg-blue-950 text-white text-center w-full md:w-1/2">Sign-Up</a>
   
</div>


</nav>
 {/*  Main Content  */}
<div className="flex items-start md:items-center h-full mb-30  w-screen  justify-center overflow-scroll">
        <div className="flex flex-col md:flex-row items-center justify-center w-screen mx-2 md:mx-10 lg:space-x-3  px-2 py-2 mt-10">
          
          <div className="flex flex-col items-center justify-around space-y-6 md:space-y-10  w-full md:w-2/3 xl:w-1/3 ">
            <h1 className="text-4xl font-bold text-blue-950">USIU-A DIGITAL EQUIPMENT BORROWING SYSTEM</h1>
            <p className="text-xl font-medium">This platform allows students to request equipment, track approvals, and streamline the borrowing process at USIU-Africa.</p>
            <div className="flex flex-col md:flex-row items-center justify-around w-full gap-4 md:gap-2 ">
            <a href="/about" className='w-full'>
            <button className="bg-blue-950 text-white font-semibold w-full py-2 px-4 rounded">Go to the Dashboard</button>
            </a>
            <a href="/about" className='w-full'>
            <button className="bg-white text-blue-950 border-2 font-semibold border-blue-950 w-full py-2 px-4 rounded">Make a request</button>
            </a>
            </div>
          </div>
          <Image src="/equipment22.png" alt="EMS Logo" className="w-2/3 md:w-5/12 lg:w-5/12 xl:w-3/12" width={500} height={100}/>
        </div>
        </div>

        

 {/*  Footer Component  */}
        <Footer />
    </div>
  );
}
