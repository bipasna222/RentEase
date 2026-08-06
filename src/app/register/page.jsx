"use client";


import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/schema/registration.schema";
import { zodResolver } from "@hookform/resolvers/zod";


export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const router = useRouter();

    const onSubmit = (data) => {
        console.log(data);

        localStorage.setItem("user", JSON.stringify(data));

        router.push("/login");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                <h1 className="mb-6 text-center text-3xl font-bold text-black">
                    Register
                </h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Full Name */}
                    <div className="mb-4">
                        <label className="text-black">Full Name</label>

                        <input
                            type="text"
                            placeholder="Enter your full name"
                            {...register("fullName")}
                            className="mt-1 w-full rounded border p-2 text-black placeholder:text-gray-400"
                        />

                        {errors.fullName && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="text-black">Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email")}
                            className="mt-1 w-full rounded border p-2 text-black placeholder:text-gray-400"
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
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
                    <div className="mb-4">
                        <label className="text-black">Role</label>

                        <select
                            {...register("role")}
                            className="mt-1 w-full rounded border p-2 text-black"
                            defaultValue=""
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="landlord">Landlord</option>
                            <option value="tenant">Tenant</option>
                        </select>

                        {errors.role && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.role.message}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded bg-green-600 p-2 text-white"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}