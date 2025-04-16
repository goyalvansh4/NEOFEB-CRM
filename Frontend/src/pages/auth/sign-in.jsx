import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalAxios from "../../../Global/GlobalAxios";
import Cookies from "js-cookie";

export function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // State for loading spinner
  const navigate = useNavigate();
  const [otp, setOtp] = useState(""); // State for OTP
  const [isOtpSent, setIsOtpSent] = useState(false); // State to toggle OTP field
  const [error, setError] = useState(""); // State for error messages

  const handleSubmit = async (e) => {
    navigate("/dashboard/home");
  };

  const handleVerifyOtp = async (e) => {
    // e.preventDefault();
    // setError(""); // Clear errors
    // console.log("Verifying OTP");
    // try {
    //   const response = await GlobalAxios.post("/admin/verify-otp", {
    //     email: formData.email,
    //     otp,
    //   });
    //   if (response.data.status === "success") {
    //     console.log("OTP verified successfully", response.data);
    //     Cookies.set("token", response.data.token);
    //     if (Cookies.get("token")) {
    //       // Navigate to dashboard
    //       window.location.href = "/dashboard/home";
    //     }
    //   } else {
    //     setError("Invalid OTP. Please try again.");
    //   }
    // } catch (err) {
    //   console.error(err);
    //   setError("An error occurred while verifying OTP.");
    // }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Sign In</h1>
        <p className="text-gray-600 text-center mt-2">
          Enter your email and password to sign in.
        </p>
        <form
          // onSubmit={isOtpSent ? handleVerifyOtp : handleSubmit}
          onSubmit={handleSubmit}
          className="mt-6 space-y-6"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="name@mail.com"
              disabled={isOtpSent}
              className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              placeholder="********"
              disabled={isOtpSent}
              className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {isOtpSent && (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="123456"
                className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
          {error && (
            <p className="text-sm text-red-600 mt-1">{error}</p>
          )}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              required
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="terms"
              className="ml-2 text-sm text-gray-600"
            >
              I agree to the{" "}
              <a href="#" className="text-blue-500 underline">
                Terms and Conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
             disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {/* {isOtpSent ? "Verify OTP" : (loading) ? "Sending" : "Send OTP"} */}
            Login
          </button>
          <div className="text-center mt-4">
            <a
              href="#"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignIn;