import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import Loader from "../../components/Loader";

const DoctorsList = () => {
  const { doctors, adminToken, getAllDoctors, changeAvailability, loading } =
    useContext(AdminContext);

  useEffect(() => {
    if (adminToken) {
      getAllDoctors();
    }
  }, [adminToken]);

  return (
    <div className="w-full max-w-5xl m-5">
      <h1 className="text-lg font-medium">All Doctors</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
          {doctors.map((item, index) => (
            <div
              className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
              key={index}
            >
              <img
                className="bg-indigo-50 group-hover:bg-primary transition-all duration-500"
                src={item.image}
                alt=""
              />
              <div className="p-4">
                <p className="text-neutral-800 text-lg font-medium">
                  {item.name}
                </p>
                <p className="text-zinc-600 text-sm">{item.speciality}</p>
                <div className="mt-2 flex items-center gap-1 text-sm">
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                  />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
