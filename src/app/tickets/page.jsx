"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketSchema } from "@/schema/ticket.schema";

export default function TicketPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(ticketSchema),
    });

    const [ticketList, setTicketList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            const response = await fetch("/api/ticket");

            const data = await response.json();

            setTicketList(data);
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (editIndex !== null) {
                await fetch("/api/ticket", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        _id: ticketList[editIndex]._id,
                        ...data,
                        status: ticketList[editIndex].status,
                    }),
                });

                setEditIndex(null);
            } else {
                await fetch("/api/ticket", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...data,
                        status: "Open",
                    }),
                });
            }

            await loadTickets();

            reset();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (index) => {
        try {
            await fetch(
                `/api/ticket?id=${ticketList[index]._id}`,
                {
                    method: "DELETE",
                }
            );

            await loadTickets();
        } catch (error) {
            console.log(error);
        }
    };

    const updateStatus = async (index, status) => {
        try {
            await fetch("/api/ticket", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: ticketList[index]._id,
                    category: ticketList[index].category,
                    description: ticketList[index].description,
                    severity: ticketList[index].severity,
                    status: status,
                }),
            });

            await loadTickets();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (index) => {
        const ticket = ticketList[index];

        setValue("category", ticket.category);
        setValue("description", ticket.description);
        setValue("severity", ticket.severity);

        setEditIndex(index);
    };

    const getSortedTickets = () => {
        const severityOrder = {
            High: 1,
            Medium: 2,
            Low: 3,
        };

        return [...ticketList].sort(
            (a, b) =>
                severityOrder[a.severity] -
                severityOrder[b.severity]
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 text-black">

            <h1 className="mb-6 text-3xl font-bold text-black">
                Maintenance Tickets
            </h1>

            <div className="rounded-lg bg-white p-6 shadow">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-4">
                        <label className="text-black">
                            Category
                        </label>

                        <select
                            {...register("category")}
                            defaultValue=""
                            className="mt-1 w-full rounded border p-2 text-black"
                        >
                            <option value="">
                                Select
                            </option>

                            <option>
                                Plumbing
                            </option>

                            <option>
                                Electrical
                            </option>

                            <option>
                                Appliance
                            </option>

                            <option>
                                Structural
                            </option>
                        </select>

                        <p className="mt-1 text-sm text-red-500">
                            {errors.category?.message}
                        </p>
                    </div>

                    <div className="mb-4">
                        <label className="text-black">
                            Description
                        </label>

                        <textarea
                            {...register("description")}
                            className="mt-1 w-full rounded border p-2 text-black"
                        />

                        <p className="mt-1 text-sm text-red-500">
                            {errors.description?.message}
                        </p>
                    </div>

                    <div className="mb-4">
                        <label className="text-black">
                            Severity
                        </label>

                        <select
                            {...register("severity")}
                            defaultValue=""
                            className="mt-1 w-full rounded border p-2 text-black"
                        >
                            <option value="">
                                Select
                            </option>

                            <option>
                                Low
                            </option>

                            <option>
                                Medium
                            </option>

                            <option>
                                High
                            </option>
                        </select>

                        <p className="mt-1 text-sm text-red-500">
                            {errors.severity?.message}
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="rounded bg-blue-600 px-4 py-2 text-white"
                    >
                        {editIndex !== null
                            ? "Update Ticket"
                            : "Submit Ticket"}
                    </button>

                </form>

                <div className="mt-8">

                    <h2 className="mb-4 text-xl font-bold">
                        Ticket List
                    </h2>

                    {ticketList.length === 0 ? (
                        <p className="text-gray-600">
                            No maintenance tickets found.
                        </p>
                    ) : (
                        getSortedTickets().map(
                            (ticket) => {

                                const originalIndex =
                                    ticketList.findIndex(
                                        (item) =>
                                            item._id ===
                                            ticket._id
                                    );

                                return (
                                    <div
                                        key={ticket._id}
                                        className="mb-4 rounded border bg-gray-50 p-4 text-black"
                                    >

                                        <p>
                                            <strong>
                                                Category:
                                            </strong>{" "}
                                            {ticket.category}
                                        </p>

                                        <p>
                                            <strong>
                                                Description:
                                            </strong>{" "}
                                            {ticket.description}
                                        </p>

                                        <p>
                                            <strong>
                                                Severity:
                                            </strong>{" "}
                                            {ticket.severity}
                                        </p>

                                        <p>
                                            <strong>
                                                Status:
                                            </strong>{" "}
                                            {ticket.status}
                                        </p>

                                        <div className="mt-3 flex gap-2">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateStatus(
                                                        originalIndex,
                                                        "Open"
                                                    )
                                                }
                                                className="rounded bg-blue-500 px-3 py-1 text-white"
                                            >
                                                Open
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateStatus(
                                                        originalIndex,
                                                        "In Progress"
                                                    )
                                                }
                                                className="rounded bg-yellow-500 px-3 py-1 text-white"
                                            >
                                                In Progress
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateStatus(
                                                        originalIndex,
                                                        "Resolved"
                                                    )
                                                }
                                                className="rounded bg-green-600 px-3 py-1 text-white"
                                            >
                                                Resolved
                                            </button>

                                        </div>

                                        <div className="mt-3 flex gap-2">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEdit(
                                                        originalIndex
                                                    )
                                                }
                                                className="rounded bg-yellow-500 px-3 py-1 text-white"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(
                                                        originalIndex
                                                    )
                                                }
                                                className="rounded bg-red-600 px-3 py-1 text-white"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>
                                );
                            }
                        )
                    )}

                </div>

            </div>

        </div>
    );
}