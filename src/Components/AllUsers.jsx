import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const AllUsers = () => {
  const data = useContext(AppContext);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [packages,setPackages]=useState("");
  const [time,setTime]=useState("");
  const [device,setDevice]=useState("");
  const { user } = useContext(AppContext);
  

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#000";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const SubmitHandler = (e) => {
    e.preventDefault();
    const GivePackage = async (id) => {
        const api = await axios.put(
          `${data.url}/package/${id}`,
          {
            packages,
            time,
            device
          },
          {
            headers: {
              "Content-Type": "application/json",
            //   Auth: data.token,
            },
            withCredentials: true,
          }
        );
        data.setReload(!data.reload);
        console.log("giving package",api);
      };
      GivePackage(data.id);
      toast.success("Details Updated", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      closeModal();
    };

  return (
    <div className="bg-[#15202b] min-h-screen text-white">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">All Users</h2>
        <div className="w-full max-w-md border border-gray-300 rounded p-4">
          {data.AllUsers.map((user) => (
            <div
              key={user._id}
              className="mb-4 border p-5 hover:bg-white hover:text-black"
            >
              <p className="font-bold text-center">User Name: {user.name}</p>
              <p className="text-center">User Email: {user.email}</p>
              <p className=" text-center">User Phone: {user.phone}</p>
              <p className=" text-center">User Package: {user.packages}</p>
              <p className=" text-center">User Time: {user.time}</p>
              <p className=" text-center">User Device: {user.device}</p>
              <div className="flex justify-center mt-5">
                <button
                  onClick={() => {
                    data.setId(user._id);
                    openModal();
                    setPackages(user.packages)
                    setTime(user.time)
                    setDevice(user.device)
                  }}
                  className="p-3 border bg-[#15202b] text-white"
                >
                  Update Details
                </button>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <button
                    onClick={closeModal}
                    className="float-right m-3 p-2 border hover:bg-red-500 hover:text-white rounded-full  text-red-500"
                  >
                    x
                  </button>
                  <form
                    onSubmit={SubmitHandler}
                    className="w-80 p-6 bg-white rounded-lg shadow-md"
                  >
                    <div className="mb-2">
                      <label
                        htmlFor="Strategy"
                        className="block text-sm font-bold text-gray-600"
                      >
                        Package
                        <input
                          type="text"
                          id="packages"
                          name="packages"
                          value={packages}
                          onChange={(e) => setPackages(e.target.value)}
                          className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                        />
                      </label>
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="Strategy"
                        className="block text-sm font-bold text-gray-600"
                      >
                        Time
                        <input
                          type="text"
                          id="time"
                          name="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                        />
                      </label>
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="Strategy"
                        className="block text-sm font-bold text-gray-600"
                      >
                        Device
                        <input
                          type="text"
                          id="device"
                          name="device"
                          value={device}
                          onChange={(e) => setDevice(e.target.value)}
                          className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                        />
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                      Give
                    </button>
                  </form>
                </Modal>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default AllUsers;
