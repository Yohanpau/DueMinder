import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit, // Added missing handleSubmit
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.message || "Login failed");
      return;
    }

    const result = await response.json();

    // Save JWT token in localStorage
    localStorage.setItem("token", result.access_token);
    localStorage.setItem("user", JSON.stringify(result.user));

    alert("Login successful!");
    navigate("/home");
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
  }
};


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center min-h-screen text-[#FFF6F2] gap-[3.25em]"
    >
      {/* Header */}
      <div className="flex flex-wrap font-bold gap-[0.3em]">
        <div className="text-[2.9rem]/[1.2em] ">
          <h1>
            Welcome to
            <div>
              <span className="text-[#FE7531]">
                DueMinder<span className="text-[#e7deda]">,</span>
              </span>
            </div>
            Sign In to Continue.
          </h1>
        </div>
        <p className="text-[1.1rem] font-normal">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#FE7531] font-bold">
            Create an account
          </a>
        </p>
      </div>

      {/* Email */}
      <div className="flex flex-col w-full text-[1.1rem] gap-[1.063em]">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-[#FE7531]">
            Email
          </label>
          <input
            type="text"
            {...register("email", { required: true })}
            placeholder="Enter your email address..."
            className="h-[2.813em] p-[0.875em] rounded-[0.625em] bg-transparent border-[#FE7531] border-[0.063em] outline-[#FFF6F2]"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">*Email* is mandatory</span>
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
          <a href="#" className="flex w-full justify-end">
            Forgot Password?
          </a>
        </div>
      </div>

      {/* Submit */}
      <button
        className="h-[2.813em] bg-[#FE7531] w-full rounded-full font-bold"
        type="submit"
      >
        Sign In
      </button>
    </form>
  );
}

export default LogIn;
