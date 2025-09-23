import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "./api"; 

function PaidBillsCard({ bill }) {
  const paymentDate = bill.paidAt
    ? new Date(bill.paidAt).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <div className="flex flex-col justify-between h-[30%] w-full bg-[#111111] border-[#464646] border-[0.063em] rounded-[1.25em] p-[1.5em] mb-2">
      <div className="flex flex-row justify-between text-white">
        <h3 className="text-[1.25rem] font-bold">{bill.bill?.name || "Unknown Bill"}</h3>
        <h3 className="text-[1.25rem] font-bold">₱{bill.amount}</h3>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col mt-2 text-white">
          <div className="flex flex-row gap-1">
            <p>Paid through</p>
            <p className="font-semibold">{bill.paidOptions || "—"}</p>
          </div>
          <p className="text-left text-white text-[3.5vw]">
            Payment Date: {paymentDate}
          </p>
        </div>
        {bill.bill?.status === "Overdue" ? (
          <div className="w-[86px] h-[36px] bg-[#b91c1c] rounded-full text-white flex items-center justify-center">
            {bill.bill?.status}
          </div>
        ) : (
          <div className="w-[86px] h-[36px] bg-[#1e5f29] rounded-full text-white flex items-center justify-center">
            {bill.bill?.status || "Paid"}
          </div>
        )}
      </div>
    </div>
  );
}




export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await api.get("/payments/history");
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch payment history", err);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div className="mb-7">
      <Link
        to="/settings"
        className="flex flex-row gap-1 items-center text-white text-[4vw] font-medium active:underline mt-[2rem]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <p className="mt-[-0.2em] font-normal text-[1rem]">Back to Settings</p>
      </Link>

      <h2 className="text-[1.5rem] font-bold text-white mt-[2rem] mb-[1.2rem] ml-[1vw]">
        Bills History
      </h2>

      {history.length === 0 ? (
        <p className="text-white ml-2">No paid bills yet.</p>
      ) : (
        history.map((payment) => (
          <PaidBillsCard key={payment.id} bill={payment} />
        ))
      )}
    </div>
  );
}
