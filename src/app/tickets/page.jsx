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
        const tickets =
            JSON.parse(localStorage.getItem("tickets")) || [];

        setTicketList(tickets);
    }, []);

    const onSubmit = (data) => {
        const tickets =
            JSON.parse(localStorage.getItem("tickets")) || [];

        if (editIndex !== null) {
            tickets[editIndex] = data;
            setEditIndex(null);
        } else {
            tickets.push({
                ...data,
                status: "Open",
            });
        }

        localStorage.setItem(
            "tickets",
            JSON.stringify(tickets)
        );

        setTicketList(tickets);

        reset();
    };

    const handleDelete = (index) => {
        const updated =
            ticketList.filter((_, i) => i !== index);

        localStorage.setItem(
            "tickets",
            JSON.stringify(updated)
        );

        setTicketList(updated);
    };

    const updateStatus = (index, status) => {
        const tickets =
            JSON.parse(localStorage.getItem("tickets")) || [];

        tickets[index].status = status;

        localStorage.setItem(
            "tickets",
            JSON.stringify(tickets)
        );

        setTicketList(tickets);
    };

    const handleEdit = (index) => {
        const ticket = ticketList[index];

        setValue("category", ticket.category);
        setValue("description", ticket.description);
        setValue("severity", ticket.severity);
        setValue("status", ticket.status);

        setEditIndex(index);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 text-black">

            <h1 className="mb-6 text-3xl font-bold text-black">
                Maintenance Tickets
            </h1>

            <div className="rounded-lg bg-white p-6 shadow">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-4">
                        <label className="text-black">Category</label>

                        <select
                            {...register("category")}
                            defaultValue=""
                            className="mt-1 w-full rounded border p-2 text-black"
                        >
                            <option value="">Select</option>
                            <option>Plumbing</option>
                            <option>Electrical</option>
                            <option>Appliance</option>
                            <option>Structural</option>
                        </select>

                        <p className="mt-1 text-sm text-red-500">
                            {errors.category?.message}
                        </p>
                    </div>

                    <div className="mb-4">
                        <label className="text-black">Description</label>

                        <textarea
                            {...register("description")}
                            className="mt-1 w-full rounded border p-2 text-black"
                        />

                        <p className="mt-1 text-sm text-red-500">
                            {errors.description?.message}
                        </p>
                    </div>

                    <div className="mb-4">
                        <label className="text-black">Severity</label>

                        <select
                            {...register("severity")}
                            defaultValue=""
                            className="mt-1 w-full rounded border p-2 text-black"
                        >
                            <option value="">Select</option>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>

                        <p className="mt-1 text-sm text-red-500">
                            {errors.severity?.message}
                        </p>
                    </div>

                    <button
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
                        ticketList.map((ticket, index) => (
                            <div
                                key={index}
                                className="mb-4 rounded border bg-gray-50 p-4 text-black"
                            >

                                <p><strong>Category:</strong> {ticket.category}</p>

                                <p><strong>Description:</strong> {ticket.description}</p>

                                <p><strong>Severity:</strong> {ticket.severity}</p>

                                <p><strong>Status:</strong> {ticket.status}</p>

                                <div className="mt-3 flex gap-2">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateStatus(index, "Open")
                                        }
                                        className="rounded bg-blue-500 px-3 py-1 text-white"
                                    >
                                        Open
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateStatus(index, "In Progress")
                                        }
                                        className="rounded bg-yellow-500 px-3 py-1 text-white"
                                    >
                                        In Progress
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateStatus(index, "Resolved")
                                        }
                                        className="rounded bg-green-600 px-3 py-1 text-white"
                                    >
                                        Resolved
                                    </button>

                                </div>

                                <div className="mt-3 flex gap-2">

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

                    )
                }

                </div>

            </div>

        </div>
    );
}