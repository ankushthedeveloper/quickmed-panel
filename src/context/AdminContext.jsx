import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("atoken") || ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(backendUrl);

  const getAllDoctors = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { atoken: adminToken } }
      );
      if (data.success) {
        setLoading(false);
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { atoken: adminToken } }
      );
      if (data.success) {
        setLoading(false);
        toast.success(data.message);
        getAllDoctors();
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { atoken: adminToken },
      });

      if (data.success) {
        setLoading(false);
        setAppointments(data.appointments);
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { atoken: adminToken } }
      );

      if (data.success) {
        setLoading(false);
        toast.success(data.message);
        getAllAppointments();
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { atoken: adminToken },
      });

      if (data.success) {
        setLoading(false);
        setDashData(data.dashData);
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    adminToken,
    setAdminToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData,
    setDashData,
    getDashData,
    loading,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
