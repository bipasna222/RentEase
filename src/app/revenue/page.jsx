"use client";

import { useEffect, useState } from "react";

export default function RevenuePage() {

  const [expectedIncome, setExpectedIncome] = useState(0);
  const [collectedIncome, setCollectedIncome] = useState(0);

  useEffect(() => {

    const units =
      JSON.parse(localStorage.getItem("units")) || [];

    const payments =
      JSON.parse(localStorage.getItem("payments")) || [];

    let expected = 0;
    let collected = 0;

    units.forEach((unit) => {
      expected += Number(unit.rent);
    });

    payments.forEach((payment) => {
      if (payment.status === "Paid") {
        collected += Number(payment.amount);
      }
    });

    setExpectedIncome(expected);
    setCollectedIncome(collected);

  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="mb-6 text-3xl font-bold text-black">
        Revenue Summary
      </h1>

      <div className="rounded-lg bg-white p-6 shadow">

        <div className="mb-6 rounded border bg-gray-50 p-4">

          <h2 className="text-xl font-bold text-black">
            Expected Monthly Income
          </h2>

          <p className="mt-2 text-2xl font-semibold text-green-600">
            Rs. {expectedIncome}
          </p>

        </div>

        <div className="rounded border bg-gray-50 p-4">

          <h2 className="text-xl font-bold text-black">
            Amount Collected
          </h2>

          <p className="mt-2 text-2xl font-semibold text-blue-600">
            Rs. {collectedIncome}
          </p>

        </div>

      </div>

    </div>
  );
}