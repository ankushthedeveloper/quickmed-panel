import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
import Loader from "../components/Loader";
const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAdminToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const [loading, setLoading] = useState(false);

  const guestAdminHandler = async () => {
    setLoading(true);
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "";
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "";
    const { data } = await axios.post(backendUrl + "/api/admin/login", {
      email: adminEmail,
      password: adminPassword,
    });
    if (data.success) {
      localStorage.setItem("atoken", data.token);
      setAdminToken(data.token);
      toast.success("Admin Login successful");
    } else {
      toast.error(data.message);
    }
    setLoading(false);
  };

  const guestDoctorLoginHandler = async () => {
    setLoading(true);
    const doctorEmail = import.meta.env.VITE_GUEST_DOCTOR_EMAIL || "";
    const doctorPassword = import.meta.env.VITE_GUEST_DOCTOR_PASSWORD || "";
    const { data } = await axios.post(backendUrl + "/api/doctor/login", {
      email: doctorEmail,
      password: doctorPassword,
    });
    if (data.success) {
      localStorage.setItem("dToken", data.token);
      setDToken(data.token);
      toast.success("Doctor Login successful");
    } else {
      toast.error(data.message);
    }
    setLoading(false);
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("atoken", data.token);
          setAdminToken(data.token);
          toast.success("Admin Login successful");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success("Doctor Login successful");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("Login failed. Try again.");
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg">
          <button
            className="bg-green-200 p-4 rounded-xl hover:bg-green-400"
            onClick={
              state === "Admin" ? guestAdminHandler : guestDoctorLoginHandler
            }
          >
            Login as Guest
          </button>
          <p className="text-2xl font-semibold m-auto">
            <span className="text-primary"> {state} </span> Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-[#dadada] rounded w-full p-2 mt-1"
              type="email"
              required
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-[#dadada] rounded w-full p-2 mt-1"
              type="password"
              required
            />
          </div>
          <button className="bg-primary text-white w-full py-2 rounded-md text-base">
            Login
          </button>

          {state === "Admin" ? (
            <p>
              Doctor Login?{" "}
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => setState("Doctor")}
              >
                Click Here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{" "}
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => setState("Admin")}
              >
                Click Here
              </span>
            </p>
          )}
        </div>
      )}
    </form>
  );
};

export default Login;
