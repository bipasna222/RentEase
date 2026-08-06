"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leaseSchema } from "@/schema/lease.schema";

export default function LeasePage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(leaseSchema),
    });

    const [leaseList, setLeaseList] = useState([]);
    const [unitList, setUnitList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const leases =
            JSON.parse(localStorage.getItem("leases")) || [];

        setLeaseList(leases);

        const units =
            JSON.parse(localStorage.getItem("units")) || [];

        const rentReadyUnits = units.filter(
            (unit) => unit.status === "Rent Ready"
        );

        setUnitList(rentReadyUnits);

    }, []);

    const onSubmit = (data) => {
        const leases =
            JSON.parse(localStorage.getItem("leases")) || [];

        if (editIndex !== null) {
            leases[editIndex] = data;
            setEditIndex(null);
        } else {
            leases.push(data);
        }

        localStorage.setItem(
            "leases",
            JSON.stringify(leases)
        );

        setLeaseList(leases);

        reset();
    };

    const handleDelete = (index) => {
        const updated =
            leaseList.filter((_, i) => i !== index);

        localStorage.setItem(
            "leases",
            JSON.stringify(updated)
        );

        setLeaseList(updated);
    };

    const getLeaseStatus = (startDate, endDate) => {
        const today = new Date();

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (today < start) {
            return "Pending Move-In";
        }

        if (today > end) {
            return "Expired";
        }

        return "Active";
    };

    const handleEdit = (index) => {
        const lease = leaseList[index];

        setValue("tenantEmail", lease.tenantEmail);
        setValue("unit", lease.unit);
        setValue("leaseStart", lease.leaseStart);
        setValue("leaseEnd", lease.leaseEnd);
        setValue(
            "securityDeposit",
            lease.securityDeposit
        );

        setEditIndex(index);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="mb-6 text-3xl font-bold text-black">
                Lease Management
            </h1>

            <div className="rounded-lg bg-white p-6 shadow">
                <h2 className="mb-4 text-xl font-semibold text-black">
                    Assign Tenant
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="text-black">
                            Tenant Email
                        </label>

                        <input
                            type="email"
                            {...register("tenantEmail")}
                            placeholder="Enter tenant email"
                            className="mt-1 w-full rounded border p-2 text-black"
                        />

                        {errors.tenantEmail && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.tenantEmail.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-black">
                            Select Unit
                        </label>

                        <select
                            {...register("unit")}
                            defaultValue=""
                            className="mt-1 w-full rounded border p-2 text-black"
                        >
                            <option value="">Select Unit</option>

                            {unitList.map((unit, index) => (
                                <option
                                    key={index}
                                    value={unit.unitNumber}
                                >
                                    {unit.unitNumber}
                                </option>
                            ))}
                        </select>

                        {errors.unit && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.unit.message}
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

                    <div className="mb-4">
                        <label className="text-black">
                            Security Deposit
                        </label>

                        <input
                            type="number"
                            {...register("securityDeposit")}
                            placeholder="Enter security deposit"
                            className="mt-1 w-full rounded border p-2 text-black"
                        />

                        {errors.securityDeposit && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.securityDeposit.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="rounded bg-blue-600 px-4 py-2 text-white"
                    >
                        {editIndex !== null
                            ? "Update Lease"
                            : "Assign Tenant"}
                    </button>
                </form>

                <div className="mt-8">
                    <h2 className="mb-4 text-xl font-bold text-black">
                        Lease List
                    </h2>

                    {leaseList.length === 0 ? (
                        <p className="text-gray-600">
                            No lease assigned yet.
                        </p>
                    ) : (
                        leaseList.map((lease, index) => (
                            <div
                                key={index}
                                className="mb-4 rounded border bg-gray-50 p-4"
                            >
                                <p className="text-black">
                                    <strong>Tenant Email:</strong>{" "}
                                    {lease.tenantEmail}
                                </p>

                                <p className="text-black">
                                    <strong>Unit:</strong>{" "}
                                    {lease.unit}
                                </p>

                                <p className="text-black">
                                    <strong>Lease Start:</strong>{" "}
                                    {lease.leaseStart}
                                </p>

                                <p className="text-black">
                                    <strong>Lease End:</strong>{" "}
                                    {lease.leaseEnd}
                                </p>

                                <p className="text-black">
                                    <strong>Security Deposit:</strong> Rs.{" "}
                                    {lease.securityDeposit}
                                </p>

                                <p className="text-black">
                                    <strong>Status:</strong>{" "}
                                    {getLeaseStatus(
                                        lease.leaseStart,
                                        lease.leaseEnd
                                    )}
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
                                        onClick={() => handleDelete(index)}
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