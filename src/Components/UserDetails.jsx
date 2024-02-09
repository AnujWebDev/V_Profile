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

const UserDetails = () => {
  const data = useContext(AppContext);
  const { user } = useContext(AppContext);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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
    const updateUser = async (id) => {
      const api = await axios.put(
        `${data.url}/user/${id}`,
        {
          name,
          email,
          phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Auth: data.token,
          },
          withCredentials: true,
        }
      );
      data.setReload(!data.reload);
      console.log("updating user",api);
    };
    updateUser(data.id);
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
    <div className="flex items-center justify-center min-h-screen bg-[#15202b]">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">User Details</h1>
        {user ? (
          <>
            <p className="mb-2 text-center font-bold border p-3 hover:bg-[#15202b] hover:text-white">
              Name: {user.name}
            </p>
            <p className="mb-2 text-center border p-3 hover:bg-[#15202b] hover:text-white">
              Email: {user.email}
            </p>
            <p className="mb-4 text-center border p-3 hover:bg-[#15202b] hover:text-white">
              Phone: {user.phone}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  data.setId(user._id);
                  openModal();
                  setName(user.name)
                  setEmail(user.email)
                  setPhone(user.phone)
                }}
                className="p-3 border hover:bg-black hover:text-white "
              >
                Update Profile
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
                      Name
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                      />
                    </label>
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="Strategy"
                      className="block text-sm font-bold text-gray-600"
                    >
                      Email
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                      />
                    </label>
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="Strategy"
                      className="block text-sm font-bold text-gray-600"
                    >
                      Phone
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                      />
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  >
                    Update
                  </button>
                </form>
              </Modal>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default UserDetails;
