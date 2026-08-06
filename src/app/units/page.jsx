"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { unitSchema } from "@/schema/unit.schema";

async function fetchUnits() {
    const response = await fetch("/api/unit");
    return await response.json();
}

export default function UnitsPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(unitSchema),
    });

    const [unitList, setUnitList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        loadUnits();
    }, []);

    const loadUnits = async () => {
        const data = await fetchUnits();
        setUnitList(data);
    };

    const onSubmit = async (data) => {
        await fetch("/api/unit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        await loadUnits();

        reset();
    };
    
    const handleDelete = (index) => {
        const updatedUnits = unitList.filter((_, i) => i !== index);

        localStorage.setItem("units", JSON.stringify(updatedUnits));
        setUnitList(updatedUnits);
    };

    const handleEdit = (index) => {
        const unit = unitList[index];

        setValue("unitNumber", unit.unitNumber);
        setValue("bedrooms", unit.bedrooms);
        setValue("bathrooms", unit.bathrooms);
        setValue("rent", unit.rent);
        setValue("description", unit.description);
        setValue("image", unit.image);
        setValue("status", unit.status);

        setEditIndex(index);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="mb-6 text-3xl font-bold text-black">
                Unit Management
            </h1>

            <div className="rounded-lg bg-white p-6 shadow">
                <h2 className="mb-4 text-xl font-semibold text-black">
                    Add Unit
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
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
                        <label className="text-black">Bedrooms</label>

                        <input
                            type="number"
                            placeholder="Enter bedrooms"
                            {...register("bedrooms")}
                            className="mt-1 w-full rounded border p-2 text-black"
                        />

                        {errors.bedrooms && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.bedrooms.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-black">Bathrooms</label>

                        <input
                            type="number"
                            placeholder="Enter bathrooms"
                            {...register("bathrooms")}
                            className="mt-1 w-full rounded border p-2 text-black"
                        />

                        {errors.bathrooms && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.bathrooms.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-black">Base Monthly Rent</label>

                        <input
                            type="number"
                            placeholder="Enter monthly rent"
                            {...register("rent")}
                            className="mt-1 w-full rounded border p-2 text-black"
                        />

                        {errors.rent && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.rent.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-black">Description</label>

                        <textarea
                            placeholder="Enter description"
                            {...register("description")}
                            className="mt-1 w-full rounded border p-2 text-black"
                        />

                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-black">Image URL</label>

                        <input
                            type="text"
                            placeholder="Paste image URL"
                            {...register("image")}
                            className="mt-1 w-full rounded border p-2 text-black"
                        />

                        {errors.image && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.image.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-black">Status</label>

                        <select
                            {...register("status")}
                            defaultValue=""
                            className="mt-1 w-full rounded border p-2 text-black"
                        >
                            <option value="">Select Status</option>
                            <option value="Hidden">Hidden</option>
                            <option value="Rent Ready">Rent Ready</option>
                            <option value="Occupied">Occupied</option>
                        </select>

                        {errors.status && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.status.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="rounded bg-blue-600 px-4 py-2 text-white"
                    >
                        {editIndex !== null ? "Update Unit" : "Add Unit"}
                    </button>
                </form>
                <div className="mt-8">
                    <h2 className="mb-4 text-xl font-bold text-black">
                        Unit List
                    </h2>

                    {unitList.length === 0 ? (
                        <p className="text-gray-600">
                            No units added yet.
                        </p>
                    ) : (
                        unitList.map((unit, index) => (
                            <div
                                key={index}
                                className="mb-4 rounded border bg-gray-50 p-4"
                            >
                                <p className="text-black">
                                    <strong>Unit Number:</strong> {unit.unitNumber}
                                </p>

                                <p className="text-black">
                                    <strong>Bedrooms:</strong> {unit.bedrooms}
                                </p>

                                <p className="text-black">
                                    <strong>Bathrooms:</strong> {unit.bathrooms}
                                </p>

                                <p className="text-black">
                                    <strong>Base Monthly Rent:</strong> Rs. {unit.rent}
                                </p>

                                <p className="text-black">
                                    <strong>Description:</strong> {unit.description}
                                </p>

                                <p className="text-black">
                                    <strong>Status:</strong> {unit.status}
                                </p>

                                <div className="mt-2">
                                    <strong className="text-black">Image:</strong>

                                    <img
                                        src={unit.image}
                                        alt="Unit"
                                        className="mt-2 h-32 w-48 rounded border object-cover"
                                    />
                                </div>

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