import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, "Nama harus diisi!").max(50, "Nama maksimal 50 karakter!"),
    email: z.string().min(1, 'Email harus diisi!').lowercase("Format Email tidak boleh ada huruf besar").email("Format Email tidak valid!"),
    password: z.string().min(6, "Password minimal 6 karakter!")
});

export const loginSchema = z.object({
    email: z.string().min(1, 'Email harus diisi!').lowercase("Format Email tidak boleh ada huruf besar").email("Format Email tidak valid!"),
    password: z.string().min(6, "Password minimal 6 karakter!")
});


