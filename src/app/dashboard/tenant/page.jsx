"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TenantDashboard() {
  const router = useRouter();

  const [lease, setLease] = useState(null);
  const [unit, setUnit] = useState(null);
  const [payments, setPayments] = useState([]);
  const [tickets, setTickets] = useState([]);

  const [category, setCategory] = useState("Plumbing");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      router.push("/login");
      return;
    }

    const fetchTenantData = async () => {
      try {
        // Fetch leases
        const leaseResponse = await fetch("/api/lease");
        const leases = await leaseResponse.json();

        const currentLease = leases.find(
          (lease) => lease.tenantEmail === user.email
        );

        if (currentLease) {
          setLease(currentLease);

          // Fetch units
          const unitResponse = await fetch("/api/unit");
          const units = await unitResponse.json();

          const currentUnit = units.find(
            (unit) =>
              String(unit.unitNumber) === String(currentLease.unit)
          );

          setUnit(currentUnit);
        }

        // Fetch payments
        const paymentResponse = await fetch("/api/payment");
        const paymentData = await paymentResponse.json();

        const tenantPayments = paymentData.filter(
          (payment) => payment.tenantEmail === user.email
        );

        setPayments(tenantPayments);

        // Fetch tickets
        const ticketResponse = await fetch("/api/ticket");
        const ticketData = await ticketResponse.json();

        const tenantTickets = ticketData.filter(
          (ticket) => ticket.tenantEmail === user.email
        );

        setTickets(tenantTickets);
      } catch (error) {
        console.log("Error fetching tenant data:", error);
      }
    };

    fetchTenantData();
  }, [router]);

  const handleSubmitTicket = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      router.push("/login");
      return;
    }

    if (!description.trim()) {
      setMessage("Please enter a description.");
      return;
    }

    try {
      const response = await fetch("/api/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenantEmail: user.email,
          category,
          description,
          severity,
          status: "Open",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to submit ticket.");
        return;
      }

      setTickets((prevTickets) => [...prevTickets, data]);

      setDescription("");
      setCategory("Plumbing");
      setSeverity("Low");
      setMessage("Maintenance ticket submitted successfully.");
    } catch (error) {
      console.log("Error submitting ticket:", error);
      setMessage("Something went wrong while submitting the ticket.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">

        {/* Tenant Dashboard */}
        <div className="rounded-lg bg-white p-8 shadow-lg">

          <h1 className="text-3xl font-bold text-black">
            Tenant Dashboard
          </h1>

          <p className="mt-3 text-gray-600">
            Welcome to RentEase!
          </p>

          {/* Lease Information */}
          <div className="mt-6 border-t pt-6">

            <h2 className="text-xl font-bold text-black">
              Lease Information
            </h2>

            {lease ? (
              <div className="mt-4 space-y-2">

                <p className="text-black">
                  <strong>Unit:</strong> {lease.unit}
                </p>

                <p className="text-black">
                  <strong>Lease Expiry:</strong> {lease.leaseEnd}
                </p>

                <p className="text-black">
                  <strong>Monthly Rent:</strong> Rs. {unit?.rent}
                </p>

                <p className="text-black">
                  <strong>Landlord Contact:</strong>{" "}
                  landlord@rentease.com
                </p>

              </div>
            ) : (
              <p className="mt-4 text-gray-600">
                No Active Lease Found.
              </p>
            )}

          </div>

          {/* Payment History */}
          <div className="mt-8 border-t pt-6">

            <h2 className="text-xl font-bold text-black">
              Payment History
            </h2>

            {payments.length > 0 ? (
              <div className="mt-4 overflow-x-auto">

                <table className="w-full border-collapse border-2 border-black">

                  <thead>
                    <tr className="bg-gray-100">

                      <th className="border border-black px-4 py-2 text-left text-black">
                        Month
                      </th>

                      <th className="border border-black px-4 py-2 text-left text-black">
                        Amount
                      </th>

                      <th className="border border-black px-4 py-2 text-left text-black">
                        Status
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {payments.map((payment) => (
                      <tr key={payment._id}>

                        <td className="border border-black px-4 py-2 text-black">
                          {payment.month}
                        </td>

                        <td className="border border-black px-4 py-2 text-black">
                          Rs. {payment.amount}
                        </td>

                        <td className="border border-black px-4 py-2">

                          <span
                            className={
                              payment.status === "Paid"
                                ? "inline-block rounded bg-green-100 px-3 py-1 font-semibold text-green-600"
                                : "inline-block rounded bg-red-100 px-3 py-1 font-semibold text-red-600"
                            }
                          >
                            {payment.status}
                          </span>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>
            ) : (
              <p className="mt-4 text-gray-600">
                No Payment History Found.
              </p>
            )}

          </div>

          {/* Maintenance Ticket Form */}
          <div className="mt-8 border-t pt-6">

            <h2 className="text-xl font-bold text-black">
              Submit Maintenance Ticket
            </h2>

            <form
              onSubmit={handleSubmitTicket}
              className="mt-4 space-y-4"
            >

              {/* Category */}
              <div>

                <label className="mb-1 block font-semibold text-black">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded border p-2 text-black"
                >
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Appliance">Appliance</option>
                  <option value="Structural">Structural</option>
                </select>

              </div>

              {/* Description */}
              <div>

                <label className="mb-1 block font-semibold text-black">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the maintenance problem"
                  className="w-full rounded border p-2 text-black"
                  rows="4"
                />

              </div>

              {/* Severity */}
              <div>

                <label className="mb-1 block font-semibold text-black">
                  Severity
                </label>

                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full rounded border p-2 text-black"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>

              </div>

              <button
                type="submit"
                className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
              >
                Submit Ticket
              </button>

            </form>

            {message && (
              <p className="mt-3 font-semibold text-black">
                {message}
              </p>
            )}

          </div>

          {/* Submitted Tickets */}
          <div className="mt-8 border-t pt-6">

            <h2 className="text-xl font-bold text-black">
              My Maintenance Tickets
            </h2>

            {tickets.length > 0 ? (
              <div className="mt-4 space-y-4">

                {tickets.map((ticket) => (
                  <div
                    key={ticket._id}
                    className="rounded border p-4"
                  >

                    <p className="text-black">
                      <strong>Category:</strong>{" "}
                      {ticket.category}
                    </p>

                    <p className="mt-1 text-black">
                      <strong>Description:</strong>{" "}
                      {ticket.description}
                    </p>

                    <p className="mt-1 text-black">
                      <strong>Severity:</strong>{" "}
                      {ticket.severity}
                    </p>

                    <p className="mt-1 text-black">
                      <strong>Status:</strong>{" "}
                      {ticket.status}
                    </p>

                  </div>
                ))}

              </div>
            ) : (
              <p className="mt-4 text-gray-600">
                No Maintenance Tickets Found.
              </p>
            )}

          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-8 rounded bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}