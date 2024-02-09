import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { AppContext } from "../Context/AppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const data = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
      console.log("Before registering:", { name, email, password, phone });
      const registerRes=await data.register({ name, email, password, phone });
      console.log("After successful registration");


        toast.success(registerRes.message, {
          position: "top-center",
          autoClose: 2999,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        if(registerRes.message!=="User already exists!"){
          setTimeout(()=>{
              navigate('/')
          },3000)
      }
  };
  
  return (
    <div className="min-h-screen bg-[rgb(21,32,43)]">
      <Link
        to={"/"}
        className="p-3  hover:cursor-pointer bg-orange text-center flex font-plus-jakarta-sans text-white w-20 rounded-full transition duration-500 ease-in-out transform hover:bg-white hover:text-black hover:scale-90"
      >
        <TiArrowBack className="text-4xl ml-2" />
      </Link>
      <div className="flex bg-[rgb(21,32,43)] items-center justify-center h-screen">
        <div className="p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold text-white mb-4">Sign Up</h2>

          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Name
              </label>
              <input
                className="w-full p-2 border rounded-md"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                placeholder="Enter your Name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full p-2 border rounded-md"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="Enter your email"
              />
            </div>


            <div className="mb-4">
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full p-2 border rounded-md"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            
            <div className="mb-4">
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                className="w-full p-2 border rounded-md"
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 w-full text-white p-2 rounded-md hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>

          <p className="text-white text-sm mt-4">
            Already a member?{" "}
            <Link to="/" className="text-blue-500 underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
