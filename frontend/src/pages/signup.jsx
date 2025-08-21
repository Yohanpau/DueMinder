import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit, // ✅ Added missing handleSubmit
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.message || "Registration failed");
      return;
    }

    alert("Registration successful!");
    navigate("/");
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
  }
};


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action=""
      className="flex flex-col items-center justify-center min-h-screen text-[#FFF6F2] gap-[3.25em]"
    >
      {/* Header */}
      <h1 className="flex flex-wrap text-[#FE7531] text-[2.9rem]/[1.2em] font-bold">
        Create your account
      </h1>

      <div className="flex flex-col w-[100%] text-[1.1rem] gap-[1.063em]">
        {/* Full name field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" id="name" className="text-[#FE7531]">
            Full Name
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Enter your full name..."
            name="name"
            id="name"
            className="h-[2.813em] p-[0.875em] rounded-[0.625em] bg-transparent border-[#FE7531] border-[0.063em] outline-[#FFF6F2]"
          />
          {errors.name && (
            <span style={{ color: "red" }}>*Name* is mandatory</span>
          )}
        </div>

        {/* Email field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" id="email" className="text-[#FE7531]">
            Email
          </label>
          <input
            type="text"
            {...register("email", { required: true })}
            placeholder="Enter your email address..."
            name="email"
            id="email"
            className="h-[2.813em] p-[0.875em] rounded-[0.625em] bg-transparent border-[#FE7531] border-[0.063em] outline-[#FFF6F2]"
          />
          {errors.email && (
            <span style={{ color: "red" }}>*Email* is mandatory</span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-[#FE7531]">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Enter your password..."
              className="w-full h-[2.813em] p-[0.875em] rounded-[0.625em] bg-transparent border-[#FE7531] border-[0.063em] outline-[#FFF6F2]"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                *Password* is mandatory
              </span>
            )}

            {/* Toggle Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-[4.5%] top-[30%] text-[#FE7531]"
            >
              {showPassword ? (
                // Eye open
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e7deda"
                  className="w-6 h-6 absolute right-[4.5%] top-[30.3%]"
                >
                  {/* When password is visible */}
                  <path
                    d="M12 4C7.03 4 3.24 6.99 2 10c1.24 3.01 5.03 6 10 6s8.76-2.99 10-6c-1.24-3.01-5.03-6-10-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              ) : (
                // Eye closed
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e7deda"
                  className="w-6 h-6 absolute right-[4.5%] top-[30.3%]"
                >
                  <path
                    d="M12 4C7.03 4 3.24 6.99 2 10c1.24 3.01 5.03 6 10 6s8.76-2.99 10-6c-1.24-3.01-5.03-6-10-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M4 4l16 11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              )}
            </button>
          </div>
          <a href="/" className="flex w-full justify-end">
            Already have an account?
          </a>
        </div>
      </div>

      {/* Sign Up button */}
      <button
        className="h-[2.813em] bg-[#FE7531] w-[100%] rounded-full font-bold"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUp;
