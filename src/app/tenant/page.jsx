"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tenantSchema } from "@/schema/tenant.schema";

async function fetchTenants() {
    const response = await fetch("/api/tenant");
    return await response.json();
}

export default function TenantPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(tenantSchema),
    });

    const [tenantList, setTenantList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        loadTenants();
    }, []);

    const loadTenants = async () => {
        const data = await fetchTenants();
        setTenantList(data);
    };

    const onSubmit = async (data) => {
        if (editIndex !== null) {
            await fetch("/api/tenant", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: tenantList[editIndex]._id,
                    ...data,
                }),
            });

            setEditIndex(null);
        } else {
            await fetch("/api/tenant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        }

        await loadTenants();

        reset();
    };

    const handleDelete = async (index) => {
        await fetch(
            `/api/tenant?id=${tenantList[index]._id}`,
            {
                method: "DELETE",
            }
        );

        await loadTenants();
    };

    const handleEdit = (index) => {
        const tenant = tenantList[index];

        setValue("fullName", tenant.fullName);
        setValue("email", tenant.email);
        setValue("phone", tenant.phone);
        setValue("unitNumber", tenant.unitNumber);
        setValue("leaseStart", tenant.leaseStart);
        setValue("leaseEnd", tenant.leaseEnd);

        setEditIndex(index);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="mb-6 text-3xl font-bold text-black">
                Tenant Management
            </h1>

            <div className="rounded-lg bg-white p-6 shadow">
                <h2 className="mb-4 text-xl font-semibold text-black">
                    Add Tenant
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="text-black">Full Name</label>

                        <input
                            type="text"
                            placeholder="Enter full name"
                            {...register("fullName")}
                            className="mt-1 w-full rounded border p-2 text-black"
                        />

                        {errors.fullName && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-black">Email</label>

                        <input
                            type="email"
                            placeholder="Enter email"
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
                        <label className="text-black">Phone</label>

                        <input
                            type="text"
                            placeholder="Enter phone number"
                            {...register("phone")}
                            className="mt-1 w-full rounded border p-2 text-black"
                        />

                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-black">Unit Number</label>

                        <input
                            type="text"
                            placeholder="Enter unit number"
                            {...register("unitNumber")}
                            className="mt-1 w-full rounded border p-2 text-black"
                        />

                        {errors.unitNumber && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.unitNumber.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-black">
                            Lease Start Date
                        </label>

                        <input
                            type="date"
                            {...register("leaseStart")}
                            className="mt-1 w-full rounded border p-2 text-black"
                        />

                        {errors.leaseStart && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.leaseStart.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-black">
                            Lease End Date
                        </label>

                        <input
                            type="date"
                            {...register("leaseEnd")}
                            className="mt-1 w-full rounded border p-2 text-black"
                        />

                        {errors.leaseEnd && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.leaseEnd.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="rounded bg-blue-600 px-4 py-2 text-white"
                    >
                        {editIndex !== null
                            ? "Update Tenant"
                            : "Add Tenant"}
                    </button>
                </form>
                <div className="mt-8">
                    <h2 className="mb-4 text-xl font-bold text-black">
                        Tenant List
                    </h2>

                    {tenantList.length === 0 ? (
                        <p className="text-gray-600">
                            No tenants added yet.
                        </p>
                    ) : (
                        tenantList.map((tenant, index) => (
                            <div
                                key={index}
                                className="mb-4 rounded border bg-gray-50 p-4"
                            >
                                <p className="text-black">
                                    <strong>Full Name:</strong>{" "}
                                    {tenant.fullName}
                                </p>

                                <p className="text-black">
                                    <strong>Email:</strong>{" "}
                                    {tenant.email}
                                </p>

                                <p className="text-black">
                                    <strong>Phone:</strong>{" "}
                                    {tenant.phone}
                                </p>

                                <p className="text-black">
                                    <strong>Unit Number:</strong>{" "}
                                    {tenant.unitNumber}
                                </p>

                                <p className="text-black">
                                    <strong>Lease Start:</strong>{" "}
                                    {tenant.leaseStart}
                                </p>

                                <p className="text-black">
                                    <strong>Lease End:</strong>{" "}
                                    {tenant.leaseEnd}
                                </p>

                                <div className="mt-4 flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleEdit(index)}
                                        className="rounded bg-yellow-500 px-3 py-1 text-white"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(index)
                                        }
                                        className="rounded bg-red-600 px-3 py-1 text-white"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}