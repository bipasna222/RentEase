"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema } from "@/schema/property.schema";

async function fetchProperties() {
    const response = await fetch("/api/property");
    return await response.json();
}

export default function propertiesPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(propertySchema),
    });

    const [propertyList, setPropertyList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = async () => {
        const data = await fetchProperties();
        setPropertyList(data);
    };

    const onSubmit = async (data) => {
        if (editIndex !== null) {
            await fetch("/api/property", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: propertyList[editIndex]._id,
                    ...data,
                }),
            });

            setEditIndex(null);
        } else {
            await fetch("/api/property", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        }

        await loadProperties();

        reset();
    };
    const handleDelete = async (id) => {
        await fetch(`/api/property?id=${id}`, {
            method: "DELETE",
        });

        await loadProperties();
    };

    const handleEdit = (index) => {
        const property = propertyList[index];

        setValue("propertyName", property.propertyName);
        setValue("address", property.address);
        setValue("totalFloors", property.totalFloors);

        setEditIndex(index);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="mb-6 text-3xl font-bold text-black">
                Property Management
            </h1>

            <div className="rounded-lg bg-white p-6 shadow">
                <h2 className="mb-4 text-xl font-semibold text-black">
                    Add Property
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="text-black">Property Name</label>
                        <input
                            type="text"
                            placeholder="Enter property name"
                            {...register("propertyName")}
                            className="mt-1 w-full rounded border p-2 text-black"
                        />
                        {errors.propertyName && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.propertyName.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-black">Address</label>
                        <input
                            type="text"
                            placeholder="Enter address"
                            {...register("address")}
                            className="mt-1 w-full rounded border p-2 text-black"
                        />
                        {errors.address && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.address.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-black">Total Floors</label>
                        <input
                            type="number"
                            placeholder="Enter total floors"
                            {...register("totalFloors")}
                            className="mt-1 w-full rounded border p-2 text-black"
                        />
                        {errors.totalFloors && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.totalFloors.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="rounded bg-blue-600 px-4 py-2 text-white"
                    >
                        {editIndex !== null ? "Update Property" : "Add Property"}
                    </button>
                </form>

                <div className="mt-8">
                    <h2 className="mb-4 text-xl font-bold text-black">
                        Property List
                    </h2>

                    {propertyList.length === 0 ? (
                        <p className="text-gray-600">
                            No properties added yet.
                        </p>
                    ) : (
                        propertyList.map((property, index) => (
                            <div
                                key={index}
                                className="mb-4 rounded border bg-gray-50 p-4"
                            >
                                <p className="text-black">
                                    <strong>Property Name:</strong>{" "}
                                    {property.propertyName}
                                </p>

                                <p className="text-black">
                                    <strong>Address:</strong>{" "}
                                    {property.address}
                                </p>

                                <p className="text-black">
                                    <strong>Total Floors:</strong>{" "}
                                    {property.totalFloors}
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
                                        onClick={() => handleDelete(property._id)}
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