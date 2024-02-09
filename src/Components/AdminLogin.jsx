import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { AppContext } from "../Context/AppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AdminLogin = () => {
  const navigate = useNavigate();
  const data=useContext(AppContext)
  const [Adminemail, setAdminEmail] = useState("");
  const [Adminpassword, setAdminPassword] = useState("");
  console.log("Admin details",Adminemail,Adminpassword)

  const handleLogin =async (e) => {
    e.preventDefault();

    const loginResult =await data.AdminLogin(Adminemail, Adminpassword);
        toast.success(loginResult.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",


        });
        if(loginResult.message!=="Admin not exist..!" && loginResult.message!== "Invalid Credential.."){
            setTimeout(()=>{
                navigate('/admindashboard')
            },2000)
        }

};


  return (
    <div className=" min-h-screen bg-[rgb(21,32,43)]">
      <Link
        to={"/"}
        className="p-3  hover:cursor-pointer bg-orange text-center flex font-plus-jakarta-sans text-white w-20 rounded-full transition duration-500 ease-in-out transform hover:bg-white hover:text-black hover:scale-90"
      >
        <TiArrowBack className="text-4xl ml-2" />
      </Link>
        <div className="flex bg-[rgb(21,32,43)] items-center justify-center h-screen">
          <div className="p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold text-white mb-4">Admin Login</h2>

            <form onSubmit={handleLogin}>
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
                name="email"
                value={Adminemail}
                onChange={(e) => setAdminEmail(e.target.value)}
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
                value={Adminpassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 w-full text-white p-2 rounded-md hover:bg-blue-700"
            >
              Login
            </button>
            
          </form>
          <p className="text-white text-sm mt-4">
            Login as User?{" "}
            <Link to="/" className="text-blue-500 underline">
              Login here!
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AdminLogin;
