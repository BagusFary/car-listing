import { Navbar } from "@/components/Navbar";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

export const Layout = () => {
  return (
    <>
      <Toaster 
        className="bg-amber-400"
        position="bottom-right" 
        reverseOrder={false} 
        />
      <Navbar />
      <Outlet />
    </>
  );
};
