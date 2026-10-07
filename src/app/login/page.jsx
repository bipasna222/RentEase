"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/schema/login.schema";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      localStorage.setItem("user", JSON.stringify(result.user));

      if (result.user.role === "admin") {
        router.push("/dashboard/admin");
      } else if (result.user.role === "landlord") {
        router.push("/dashboard/landlord");
      } else if (result.user.role === "tenant") {
        router.push("/dashboard/tenant");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
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
              className="mt-1 w-full rounded border p-2 text-black placeholder:text-gray-400"
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