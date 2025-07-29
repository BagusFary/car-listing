
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import UsedCarImage from "@/assets/image/for-sale-car-image.jpg";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { loginSchema } from "@/validators/authSchema";
import { useLoginUserApi } from "../../../hooks/api/useLoginUserApi";

export const Login = () => {
    
    const { register, handleSubmit, formState : { errors}, reset } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const {isLoading, response, isError, loginUserApi} = useLoginUserApi();

    let navigate = useNavigate();

    const handleLogin = async (data) => {

        console.log('masuk handle login');

        try {
            
            await loginUserApi(data);
            toast.success("Login berhasil!, Anda akan diarahkan ke halaman daftar Mobil");

            setTimeout(() => {
                reset();
                navigate('/car');
            }, 500);

        } catch (error) {

            if(error?.status === 404){

                toast.error('Terjadi kesalahan pada server');
                return;
            }

            if(error?.response?.data){

                toast.error(error?.response?.data?.message);
                return;
            }

        }
    }

    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        
        if(response && response.status === 200){
            localStorage.setItem('credentials', JSON.stringify(response.data));
        }

    }, [response]);

    return (
        <>
            <div className="h-screen w-screen flex flex-col items-center mt-20 gap-5">
                <div className="shadow-2xl border-1 h-150 w-200">
                    <div className="w-full h-full flex flex-row ">
                        <img onContextMenu={(e) => e.preventDefault()} src={UsedCarImage} className="w-[50%] object-cover object-[25%]" alt="" />
                        <div className="w-[50%]">
                            <div className="h-full flex flex-col justify-center items-center">
                                <form onSubmit={handleSubmit(handleLogin)}>
                                    <div className="shadow-xl border h-auto w-75 p-5 flex flex-col gap-3">
                                        <h1 className="text-2xl font-mono font-semibold flex justify-center">Login</h1>
                                        <div className="grid gap-1">
                                            <Label htmlFor="email" className="font-mono font-semibold text-md">Email</Label>
                                            <Input {...register("email")} placeholder="Email" autoComplete="off"/>
                                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p> }
                                        </div>
                                        <div className="grid gap-1">
                                            <Label htmlFor="password" className="font-mono font-semibold text-md">Password</Label>
                                            <Input type={isVisible ? "text" : "password"} {...register("password")} placeholder="Password" autoComplete="off"/>
                                            <div className="flex flex-row gap-2 mt-1">
                                                <Checkbox 
                                                    id="showPassword"
                                                    checked={isVisible}
                                                    onCheckedChange={(checked) => setIsVisible(checked)}
                                                />
                                                <Label htmlFor="showPassword" >Show Password</Label>
                                            </div>
                                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p> }
                                        </div>
                                        <div className="flex  flex-col mt-5 gap-2">
                                            <Button type="submit" disabled={isLoading} className="cursor-pointer">
                                                {
                                                    isLoading && (
                                                        <>
                                                           <Loader2Icon className="animate-spin" /> 
                                                           <p className="text-white">Loading...</p>
                                                        </>
                                                    )
                                                }
                                                {
                                                    !isLoading && (
                                                        <p className="text-white">Login</p>
                                                    )
                                                }
                                            </Button>
                                            <Link to="/register"  className="text-sky-600 text-sm cursor-pointer">Belum punya akun?, Registrasi disini</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}