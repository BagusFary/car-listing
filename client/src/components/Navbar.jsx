import { Link } from "react-router";
export const Navbar = () => {
    return (
        <>
            <div className="w-full h-[80px] bg-gray-500 p-10">
                <div className="w-full h-full flex items-center justify-between">
                    <h1 className="text-white text-2xl font-mono font-semibold">CarListing</h1>
                    <div className="flex justify-center items-center gap-5">
                        <Link to="/" className="text-md uppercase text-white font-mono font-semibold">Daftar Mobil</Link>
                        <Link to="/create" className="text-md uppercase text-white font-mono font-semibold">Tambah Mobil</Link>
                    </div>
                </div>
            </div>
        </>
    )
}