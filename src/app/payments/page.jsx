"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema } from "@/schema/payment.schema";

export default function PaymentsPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(paymentSchema),
    });

    const [paymentList, setPaymentList] = useState([]);

    useEffect(() => {
        const payments =
            JSON.parse(localStorage.getItem("payments")) || [];

        setPaymentList(payments);
    }, []);

    const onSubmit = (data) => {
        const payments =
            JSON.parse(localStorage.getItem("payments")) || [];

        payments.push({
            ...data,
            status: "Unpaid",
        });

        localStorage.setItem(
            "payments",
            JSON.stringify(payments)
        );

        setPaymentList(payments);

        reset();
    };

    const markAsPaid = (index) => {
        const payments =
            JSON.parse(localStorage.getItem("payments")) || [];

        payments[index].status = "Paid";

        localStorage.setItem(
            "payments",
            JSON.stringify(payments)
        );

        setPaymentList(payments);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 text-black">
            <h1 className="mb-6 text-3xl font-bold">
                Payment Tracking
            </h1>

            <div className="rounded-lg bg-white p-6 shadow">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-4">
                        <label className="text-black">
                            Tenant Email
                        </label>

                        <input
                            type="email"
                            {...register("tenantEmail")}
                            className="mt-1 w-full rounded border p-2"
                            placeholder="Enter tenant email"
                        />

                        {errors.tenantEmail && (
                            <p className="mt-1 text-red-500">
                                {errors.tenantEmail.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-black">
                            Month
                        </label>

                        <input
                            type="month"
                            {...register("month")}
                            className="mt-1 w-full rounded border p-2"
                        />

                        {errors.month && (
                            <p className="mt-1 text-red-500">
                                {errors.month.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-black">
                            Amount
                        </label>

                        <input
                            type="number"
                            {...register("amount")}
                            className="mt-1 w-full rounded border p-2"
                            placeholder="Enter rent amount"
                        />

                        {errors.amount && (
                            <p className="mt-1 text-red-500">
                                {errors.amount.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="rounded bg-blue-600 px-4 py-2 text-white"
                    >
                        Generate Invoice
                    </button>

                </form>

                <div className="mt-8">

                    <h2 className="mb-4 text-xl font-bold">
                        Payment List
                    </h2>

                    {paymentList.length === 0 ? (
                        <p>No payments found.</p>
                    ) : (
                        paymentList.map((payment, index) => (
                            <div
                                key={index}
                                className="mb-4 rounded border bg-gray-50 p-4"
                            >
                                <p>
                                    <strong>Email:</strong>{" "}
                                    {payment.tenantEmail}
                                </p>

                                <p>
                                    <strong>Month:</strong>{" "}
                                    {payment.month}
                                </p>

                                <p>
                                    <strong>Amount:</strong> Rs.{" "}
                                    {payment.amount}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    {payment.status}
                                </p>

                                {payment.status === "Unpaid" && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            markAsPaid(index)
                                        }
                                        className="mt-3 rounded bg-green-600 px-3 py-1 text-white"
                                    >
                                        Mark as Paid
                                    </button>
                                )}
                            </div>
                        ))
                    )}

                </div>

            </div>
        </div>
    );
}