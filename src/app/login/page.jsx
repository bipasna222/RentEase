"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const [success, setSuccess] = useState("");
    const router = useRouter();

    const onSubmit = (data) => {
        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (
            savedUser &&
            savedUser.email === data.email &&
            savedUser.password === data.password
        ) {
            if (savedUser.role === "admin") {
                router.push("/dashboard/admin");
            } else if (savedUser.role === "landlord") {
                router.push("/dashboard/landlord");
            } else {
                router.push("/dashboard/tenant");
            }
        } else {
            alert("Invalid Email or Password");
        }
    };

    return (

        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                <h1 className="mb-6 text-center text-3xl font-bold text-black">
                    Login
                </h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="text-black">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email")}
                            className="mt-1 w-full rounded border p-2 text-black"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-black">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password")}
                            className="mt-1 w-full rounded border p-2 text-black placeholder:text-gray-400"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {success && (
                        <p className="mt-4 text-center font-semibold text-green-600">
                            {success}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded bg-blue-600 p-2 text-white"
                    >
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
}