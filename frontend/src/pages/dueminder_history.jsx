import React from "react";
import { Link } from "react-router-dom";

function PaidBillsCard() {
    return (
        <div className="flex flex-col justify-between align-middle h-[30%] w-[100%] bg-[#111111] border-[#464646] border-[0.063em] rounded-[1.25em] p-[1.5em] gap-[0.2rem]">
            <div className="flex flex-row justify-between text-white">
                <h3 className="text-[1.25rem] font-bold">Electricity</h3>
                <div className="relative inline-block text-left">
                    <h3 className="text-[1.25rem] font-bold">₱500</h3>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col justify-between mt-2 text-white">
                    <div className="flex flex-row gap-1">
                        <p className="text-white">Paid through </p>
                        <p className="font-semibold">BANK</p>
                    </div>
                    <p className="text-left text-white text-[3.5vw]">Payment Date: September 1, 2025</p>
                </div>
                <div className="w-[86px] h-[36px] bg-[#4D1717] rounded-full text-left text-white flex items-center justify-center">
                    Overdue
                </div>
            </div>
        </div>
    );
}

export default function History() {
    return (
        <div>
            <Link
                to="/settings"
                className="flex flex-row gap-1 items-center align-middle text-white text-[4vw] font-medium active:underline mt-[2rem]"
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
            <h2 className="text-[1.5rem]/[1em] font-bold text-white mt-[5vh] mb-[3.5vh] ml-[1vw]">Bills History</h2>
            <PaidBillsCard />
        </div>
    );
}
