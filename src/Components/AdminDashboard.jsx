import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaChessKnight } from "react-icons/fa";
import { LiaChessKnightSolid } from "react-icons/lia";
import { LiaChessSolid } from "react-icons/lia";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { LiaReceiptSolid } from "react-icons/lia";
import { LiaExclamationTriangleSolid } from "react-icons/lia";
import { LiaLinkSolid } from "react-icons/lia";
import { LiaUserTieSolid } from "react-icons/lia";
import { LiaCoinsSolid } from "react-icons/lia";
import { LiaUnlockAltSolid } from "react-icons/lia";
import { MdMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { LiaCoffeeSolid } from "react-icons/lia";
import { LiaEnvelopeSolid } from "react-icons/lia";
import { LuCodesandbox } from "react-icons/lu";
import { IoShareSocial } from "react-icons/io5";
import { MdHomeRepairService } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { FcGallery } from "react-icons/fc";
import { CiBoxList } from "react-icons/ci";
import { RiSecurePaymentFill } from "react-icons/ri";
import Profile from "../assets/Profile.png";

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
const AdminDashboard = () => {
  const entryData = useContext(AppContext);
  const { admin } = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [numberOfErrors, setNumberOfErrors] = useState(0);
  const [Stratergy, setStrategy] = useState("");
  const [Script, setScript] = useState("");
  const [Qty, setQty] = useState(0);
  const [Side, setSide] = useState("BUY");
  const [EntryPrice, setEntryPrice] = useState(0);
  const [ExitPrice, setExitPrice] = useState(0);
  const [Status, setStatus] = useState("CLOSED");

  useEffect(() => {
    const fetchEntryBYId = async () => {
      const api = await axios.get(`${entryData.url}/entry/${entryData.id}`, {
        headers: {
          "Content-Type": "application/json",
          Auth: entryData.token,
        },
        withCredentials: true,
      });
      let entry = api.data.entry;
      console.log("useEffect id", entry);
      setStrategy(entry.Stratergy);
      setScript(entry.Script);
      setQty(entry.Qty);
      setSide(entry.Side);
      setEntryPrice(entry.EntryPrice);
      setExitPrice(entry.ExitPrice);
      setStatus(entry.Status);
    };
    fetchEntryBYId();
  }, [entryData.id]);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    console.log(
      "getting form data =",
      Stratergy,
      Script,
      Qty,
      Side,
      EntryPrice,
      ExitPrice,
      Status
    );
    if (entryData.id === " ") {
      await entryData.addEntry({
        Stratergy,
        Script,
        Qty,
        Side,
        EntryPrice,
        ExitPrice,
        Status,
      });

      entryData.setReload(!entryData.reload);
      // const response = entryData.addEntry;
      // console.log("entry", response.message);

      toast.success("Entry Added Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const updateEntry = async (id) => {
        const api = await axios.put(
          `${entryData.url}/entry/${id}`,
          {
            Stratergy,
            Script,
            Qty,
            Side,
            EntryPrice,
            ExitPrice,
            Status,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Auth: entryData.token,
            },
            withCredentials: true,
          }
        );

        entryData.setReload(!entryData.reload);
        console.log(api);
      };
      updateEntry(entryData.id);
      toast.success("Entry Edited Successfully", {
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
    }
    entryData.setId(" ");
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#000";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };
  const calculateTodayProfit = () => {
    if (!entryData.entry || entryData.entry.length === 0) {
      return 0;
    }

    const totalPnl = entryData.entry.reduce((acc, item) => {
      const pnlValue = parseFloat(item.Pnl);
      return !isNaN(pnlValue) ? acc + pnlValue : acc;
    }, 0);

    const roundedTotalPnl = Number(totalPnl.toFixed(1));

    return roundedTotalPnl;
  };

  const todayProfitOrLoss = calculateTodayProfit();
  console.log("todayProfitOrLoss", todayProfitOrLoss);

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen bg-[#15202b] text-white">
        <div
          className={`transition-all ${
            isSidebarOpen ? "w-80" : "w-24"
          } overflow-y-scroll overflow-x-scroll overflow-hidden border`}
        >
          <div className="p-4">
            <h1
              style={{ fontFamily: "PT Sans, sans-serif" }}
              className="text-md ml-5  mb-10"
            >
              V_Profile Dashboard
            </h1>
            <ul>
              <li
                className={`mb-4 w-full hover:cursor-pointer p-1 flex ${
                  selectedMenuItem === "profile" ? "hover:cursor-pointer" : ""
                }`}
                onClick={() => handleMenuItemClick("profile")}
              >
                <LiaUserTieSolid className="mr-4 text-2xl" />
                {isSidebarOpen && (
                  <button
                    style={{ fontFamily: "Poppins", sansSerif: "sans-serif" }}
                  >
                    Profile
                  </button>
                )}
              </li>
              <li
                className={`mb-4 w-full hover:cursor-pointer  p-1 flex ${
                  selectedMenuItem === "myStrategies"
                    ? "hover:cursor-pointer"
                    : ""
                }`}
                onClick={() => handleMenuItemClick("Company")}
              >
                <LuCodesandbox className="mr-4 text-2xl" />
                {isSidebarOpen && (
                  <span
                    style={{ fontFamily: "Poppins", sansSerif: "sans-serif" }}
                  >
                    Company
                  </span>
                )}
              </li>
              <li
                className={`mb-4 w-full hover:cursor-pointer  p-1 flex ${
                  selectedMenuItem === "Strategieshub"
                    ? "hover:cursor-pointer"
                    : ""
                }`}
                onClick={() => handleMenuItemClick("SocialMedia")}
              >
                <IoShareSocial className=" mr-4 text-2xl" />
                {isSidebarOpen && (
                  <span
                    style={{ fontFamily: "Poppins", sansSerif: "sans-serif" }}
                  >
                    Social Media
                  </span>
                )}
              </li>

              <li
                className={`mb-4 w-full hover:cursor-pointer p-1 flex ${
                  selectedMenuItem === "order" ? "hover:cursor-pointer" : ""
                }`}
                onClick={() => handleMenuItemClick("OurService")}
              >
                <MdHomeRepairService className="mr-4 text-2xl" />
                {isSidebarOpen && (
                  <span
                    style={{ fontFamily: "Poppins", sansSerif: "sans-serif" }}
                  >
                    Our Service
                  </span>
                )}
              </li>
              <li
                className={`mb-4 w-full hover:cursor-pointer p-1 flex ${
                  selectedMenuItem === "position" ? "hover:cursor-pointer" : ""
                }`}
                onClick={() => handleMenuItemClick("Appointment")}
              >
                <CiCalendarDate className="mr-4 text-2xl" />
                {isSidebarOpen && (
                  <span
                    style={{ fontFamily: "Poppins", sansSerif: "sans-serif" }}
                  >
                    Appointment
                  </span>
                )}
              </li>
              <li
                className={`mb-4 w-full hover:cursor-pointer p-1 relative flex ${
                  selectedMenuItem === "error" ? "hover:cursor-pointer" : ""
                }`}
                onClick={() => handleMenuItemClick("imageGallery")}
              >
                <FcGallery className="mr-4 text-2xl" />
                {isSidebarOpen && (
                  <span
                    className="z-10"
                    style={{ fontFamily: "Poppins", sansSerif: "sans-serif" }}
                  >
                    Image gallery
                  </span>
                )}
              </li>
              <li
                className={`mb-4 w-full hover:cursor-pointer p-1 flex ${
                  selectedMenuItem === "broker" ? "hover:cursor-pointer" : ""
                }`}
                onClick={() => handleMenuItemClick("productList")}
              >
                <CiBoxList className=" mr-4 text-2xl" />
                {isSidebarOpen && (
                  <span
                    style={{ fontFamily: "Poppins", sansSerif: "sans-serif" }}
                  >
                    Product list
                  </span>
                )}
              </li>
              <li
                className={`mb-4 w-full hover:cursor-pointer p-1 flex ${
                  selectedMenuItem === "broker" ? "hover:cursor-pointer" : ""
                }`}
                onClick={() => handleMenuItemClick("payment")}
              >
                <RiSecurePaymentFill className=" mr-4 text-2xl" />
                {isSidebarOpen && (
                  <span
                    style={{ fontFamily: "Poppins", sansSerif: "sans-serif" }}
                  >
                    Payment
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>
        {selectedMenuItem === "profile" && (
          <>
            <div className="flex flex-col  overflow-y-hidden flex-1">
              <div className="flex fixed w-[95%] h-20 bg-[#15202b] z-50 border rounded-xl text-white justify-between">
                <div
                  className={`flex-1 transition-all ${
                    isSidebarOpen ? "ml-2" : "ml-5"
                  }`}
                >
                  <button
                    style={{ fontFamily: "PT Sans, sans-serif" }}
                    className="flex text-2xl mt-5  rounded-lg font-bold mb-2"
                    onClick={toggleSidebar}
                  >
                    <FaBars className="text-2xl mr-2  mt-1" />
                    Dashboard
                  </button>
                </div>
                <div
                  className={`flex flex-col items-center ${
                    isSidebarOpen ? "mr-52" : ""
                  }`}
                >
                  {entryData.isAdminAuthenticated && (
                    <div className="flex justify-end  mt-2">
                      <img
                        src={Profile}
                        className="w-[10px] h-[20px] mt-4 mr-1"
                        alt="profile icon"
                      ></img>
                      <Link
                        style={{ fontFamily: "PT Sans, sans-serif" }}
                        className="flex flex-col text-sm mr-10 p-3 py-1 rounded-lg font-bold mb-2"
                      >
                        {admin?.Adminname}
                        <span className="text-sm">{"(admin)"}</span>
                      </Link>
                    </div>
                  )}

                  {entryData.isAdminAuthenticated && (
                    <Link
                      onClick={entryData.AdminLogout}
                      to={"/adminlogin"}
                      className="ml-10 mr-20 text-gray-300 relative top-[-14px] left-[-35px] lg:mr-10 text-sm"
                    >
                      Logout
                    </Link>
                  )}
                  {!entryData.isAdminAuthenticated && (
                    <Link
                      to={"/adminlogin"}
                      className="ml-10 mr-20 lg:mr-10 text-sm"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
              <div
                className={`flex-1 transition-all z-0 ${
                  isSidebarOpen ? "ml-0" : "ml-0"
                }`}
              >
                <div className="flex-1 mt-24 flex-col overflow-y-scroll  transition-all">
                  <div className="p-5 w-full h-screen ">
                    <div className="bg-black text-white rounded-lg w-full h-[700px]">
                    
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
                              Strategy:
                              <input
                                type="text"
                                id="Strategy"
                                name="Strategy"
                                value={Stratergy}
                                onChange={(e) => setStrategy(e.target.value)}
                                className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                              />
                            </label>
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor="Script"
                              className="block text-sm font-bold text-gray-600"
                            >
                              Script:
                              <input
                                type="text"
                                id="Script"
                                name="Script"
                                value={Script}
                                onChange={(e) => setScript(e.target.value)}
                                className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                              />
                            </label>
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor="qty"
                              className="block text-sm font-bold text-gray-600"
                            >
                              Quantity:
                              <input
                                type="text"
                                id="qty"
                                name="qty"
                                value={Qty}
                                onChange={(e) => setQty(e.target.value)}
                                className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                              />
                            </label>
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor="side"
                              className="block text-sm font-bold text-gray-600"
                            >
                              Side:
                              <select
                                id="side"
                                name="side"
                                value={Side}
                                onChange={(e) => setSide(e.target.value)}
                                className="form-select mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                              >
                                <option value="BUY">BUY</option>
                                <option value="SELL">SELL</option>
                              </select>
                            </label>
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor="entryPrice"
                              className="block text-sm font-bold text-gray-600"
                            >
                              Entry Price:
                              <input
                                type="text"
                                id="entryPrice"
                                name="entryPrice"
                                value={EntryPrice}
                                onChange={(e) => setEntryPrice(e.target.value)}
                                className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                              />
                            </label>
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor="exitPrice"
                              className="block text-sm font-bold text-gray-600"
                            >
                              Exit Price:
                              <input
                                type="text"
                                id="exitPrice"
                                name="exitPrice"
                                value={ExitPrice}
                                onChange={(e) => setExitPrice(e.target.value)}
                                className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                              />
                            </label>
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor="Status"
                              className="block text-sm font-bold text-gray-600"
                            >
                              Status:
                              <select
                                id="Status"
                                name="Status"
                                value={Status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="form-select mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                              >
                                <option value="CLOSED">CLOSED</option>
                                <option value="OPEN">OPEN</option>
                              </select>
                            </label>
                          </div>
                          <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                          >
                            Submit
                          </button>
                        </form>
                      </Modal>
                      <div className="p-3 flex justify-center">
                        <form className="w-full p-6  rounded-lg shadow-md">
                          <div className="mb-2">
                            <label
                              htmlFor="Strategy"
                              className="block text-sm font-bold"
                            >
                              Name
                              <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input mt-1 block w-60 border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                              />
                            </label>
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor="Strategy"
                              className="block text-sm font-bold "
                            >
                              Email
                              <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input mt-1 block w-60 border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                              />
                            </label>
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor="Strategy"
                              className="block text-sm font-bold"
                            >
                              Phone
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="form-input mt-1 block w-60 border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
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

                        <div className="h-[600px]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {selectedMenuItem === "Company" && (
          <>
            <div className="flex flex-col  overflow-y-hidden flex-1">
              <div className="flex fixed w-[95%] h-20 bg-[#15202b] z-50 border rounded-xl text-white justify-between">
                <div
                  className={`flex-1 transition-all ${
                    isSidebarOpen ? "ml-2" : "ml-5"
                  }`}
                >
                  <button
                    style={{ fontFamily: "PT Sans, sans-serif" }}
                    className="flex text-2xl mt-5  rounded-lg font-bold mb-2"
                    onClick={toggleSidebar}
                  >
                    <FaBars className="text-2xl mr-2  mt-1" />
                    Dashboard
                  </button>
                </div>
                <div
                  className={`flex flex-col items-center ${
                    isSidebarOpen ? "mr-52" : ""
                  }`}
                >
                  {entryData.isAdminAuthenticated && (
                    <div className="flex justify-end  mt-2">
                      <img
                        src={Profile}
                        className="w-[10px] h-[20px] mt-4 mr-1"
                        alt="profile icon"
                      ></img>
                      <Link
                        style={{ fontFamily: "PT Sans, sans-serif" }}
                        className="flex flex-col text-sm mr-10 p-3 py-1 rounded-lg font-bold mb-2"
                      >
                        {admin?.Adminname}
                        <span className="text-sm">{"(admin)"}</span>
                      </Link>
                    </div>
                  )}

                  {entryData.isAdminAuthenticated && (
                    <Link
                      onClick={entryData.AdminLogout}
                      to={"/adminlogin"}
                      className="ml-10 mr-20 text-gray-300 relative top-[-14px] left-[-35px] lg:mr-10 text-sm"
                    >
                      Logout
                    </Link>
                  )}
                  {!entryData.isAdminAuthenticated && (
                    <Link
                      to={"/adminlogin"}
                      className="ml-10 mr-20 lg:mr-10 text-sm"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
              <div
                className={`flex-1 transition-all z-0 ${
                  isSidebarOpen ? "ml-0" : "ml-0"
                }`}
              >
                <div className="flex-1 mt-24 flex-col overflow-y-scroll  transition-all">
                
                  <div className="bg-black text-white rounded-lg w-full h-[700px]">
                
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
                            Strategy:
                            <input
                              type="text"
                              id="Strategy"
                              name="Strategy"
                              value={Stratergy}
                              onChange={(e) => setStrategy(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="Script"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Script:
                            <input
                              type="text"
                              id="Script"
                              name="Script"
                              value={Script}
                              onChange={(e) => setScript(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="qty"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Quantity:
                            <input
                              type="text"
                              id="qty"
                              name="qty"
                              value={Qty}
                              onChange={(e) => setQty(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="side"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Side:
                            <select
                              id="side"
                              name="side"
                              value={Side}
                              onChange={(e) => setSide(e.target.value)}
                              className="form-select mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            >
                              <option value="BUY">BUY</option>
                              <option value="SELL">SELL</option>
                            </select>
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="entryPrice"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Entry Price:
                            <input
                              type="text"
                              id="entryPrice"
                              name="entryPrice"
                              value={EntryPrice}
                              onChange={(e) => setEntryPrice(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="exitPrice"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Exit Price:
                            <input
                              type="text"
                              id="exitPrice"
                              name="exitPrice"
                              value={ExitPrice}
                              onChange={(e) => setExitPrice(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="Status"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Status:
                            <select
                              id="Status"
                              name="Status"
                              value={Status}
                              onChange={(e) => setStatus(e.target.value)}
                              className="form-select mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            >
                              <option value="CLOSED">CLOSED</option>
                              <option value="OPEN">OPEN</option>
                            </select>
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                          Submit
                        </button>
                      </form>
                    </Modal>
                    <div className="p-3 flex justify-center">
                      <form className="w-full p-6  rounded-lg shadow-md">
                        <div className="mb-2">
                          <label
                            htmlFor="Strategy"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Company Name
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="Strategy"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Company Tagline
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="Strategy"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Company Logo
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
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

                      <div className="h-[600px]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {selectedMenuItem === "SocialMedia" && (
          <>
            <div className="flex flex-col  overflow-y-hidden flex-1">
              <div className="flex fixed w-[95%] h-20 bg-[#15202b] z-50 border rounded-xl text-white justify-between">
                <div
                  className={`flex-1 transition-all ${
                    isSidebarOpen ? "ml-2" : "ml-5"
                  }`}
                >
                  <button
                    style={{ fontFamily: "PT Sans, sans-serif" }}
                    className="flex text-2xl mt-5  rounded-lg font-bold mb-2"
                    onClick={toggleSidebar}
                  >
                    <FaBars className="text-2xl mr-2  mt-1" />
                    Dashboard
                  </button>
                </div>
                <div
                  className={`flex flex-col items-center ${
                    isSidebarOpen ? "mr-52" : ""
                  }`}
                >
                  {entryData.isAdminAuthenticated && (
                    <div className="flex justify-end  mt-2">
                      <img
                        src={Profile}
                        className="w-[10px] h-[20px] mt-4 mr-1"
                        alt="profile icon"
                      ></img>
                      <Link
                        style={{ fontFamily: "PT Sans, sans-serif" }}
                        className="flex flex-col text-sm mr-10 p-3 py-1 rounded-lg font-bold mb-2"
                      >
                        {admin?.Adminname}
                        <span className="text-sm">{"(admin)"}</span>
                      </Link>
                    </div>
                  )}

                  {entryData.isAdminAuthenticated && (
                    <Link
                      onClick={entryData.AdminLogout}
                      to={"/adminlogin"}
                      className="ml-10 mr-20 text-gray-300 relative top-[-14px] left-[-35px] lg:mr-10 text-sm"
                    >
                      Logout
                    </Link>
                  )}
                  {!entryData.isAdminAuthenticated && (
                    <Link
                      to={"/adminlogin"}
                      className="ml-10 mr-20 lg:mr-10 text-sm"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
              <div
                className={`flex-1 transition-all z-0 ${
                  isSidebarOpen ? "ml-0" : "ml-0"
                }`}
              >
                <div className="flex-1 mt-24 flex-col overflow-y-scroll  transition-all">
                  <div className="bg-black text-white rounded-lg w-full h-full">
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
                            Strategy:
                            <input
                              type="text"
                              id="Strategy"
                              name="Strategy"
                              value={Stratergy}
                              onChange={(e) => setStrategy(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="Script"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Script:
                            <input
                              type="text"
                              id="Script"
                              name="Script"
                              value={Script}
                              onChange={(e) => setScript(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="qty"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Quantity:
                            <input
                              type="text"
                              id="qty"
                              name="qty"
                              value={Qty}
                              onChange={(e) => setQty(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="side"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Side:
                            <select
                              id="side"
                              name="side"
                              value={Side}
                              onChange={(e) => setSide(e.target.value)}
                              className="form-select mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            >
                              <option value="BUY">BUY</option>
                              <option value="SELL">SELL</option>
                            </select>
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="entryPrice"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Entry Price:
                            <input
                              type="text"
                              id="entryPrice"
                              name="entryPrice"
                              value={EntryPrice}
                              onChange={(e) => setEntryPrice(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="exitPrice"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Exit Price:
                            <input
                              type="text"
                              id="exitPrice"
                              name="exitPrice"
                              value={ExitPrice}
                              onChange={(e) => setExitPrice(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="Status"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Status:
                            <select
                              id="Status"
                              name="Status"
                              value={Status}
                              onChange={(e) => setStatus(e.target.value)}
                              className="form-select mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            >
                              <option value="CLOSED">CLOSED</option>
                              <option value="OPEN">OPEN</option>
                            </select>
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                          Submit
                        </button>
                      </form>
                    </Modal>
                    <div className="p-3 flex justify-center">
                      <form>
                        <div className="mb-4">
                          <label
                            className="text-sm font-bold mb-2"
                            htmlFor="whatsApp"
                          >
                            WhatsApp:
                          </label>
                          <input
                            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                            type="text"
                            name="whatsApp"
                          />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                          <label
                            className="block  text-sm font-bold mb-2"
                            htmlFor="email"
                          >
                            Email:
                          </label>
                          <input
                            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                            type="text"
                            name="email"
                          />
                        </div>

                        {/* Facebook */}
                        <div className="mb-4">
                          <label
                            className="block text-sm font-bold mb-2"
                            htmlFor="facebook"
                          >
                            Facebook:
                          </label>
                          <input
                            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                            type="text"
                            name="facebook"
                          />
                        </div>

                        {/* Instagram */}
                        <div className="mb-4">
                          <label
                            className="block  text-sm font-bold mb-2"
                            htmlFor="instagram"
                          >
                            Instagram:
                          </label>
                          <input
                            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                            type="text"
                            name="instagram"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block text-sm font-bold mb-2"
                            htmlFor="twitter"
                          >
                            Twitter:
                          </label>
                          <input
                            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                            type="text"
                            name="twitter"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block text-sm font-bold mb-2"
                            htmlFor="twitter"
                          >
                            Skype:
                          </label>
                          <input
                            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                            type="text"
                            name="Skype"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block text-sm font-bold mb-2"
                            htmlFor="twitter"
                          >
                            Discord:
                          </label>
                          <input
                            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                            type="text"
                            name="Discord"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block  text-sm font-bold mb-2"
                            htmlFor="twitter"
                          >
                            linkdin:
                          </label>
                          <input
                            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                            type="text"
                            name="Linkdin"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block  text-sm font-bold mb-2"
                            htmlFor="twitter"
                          >
                            Website:
                          </label>
                          <input
                            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                            type="text"
                            name="Website"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block  text-sm font-bold mb-2"
                            htmlFor="twitter"
                          >
                            location:
                          </label>
                          <input
                            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                            type="text"
                            name="location"
                          />
                        </div>

                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                          Save
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

{selectedMenuItem === "OurService" && (
          <>
            <div className="flex flex-col  overflow-y-hidden flex-1">
              <div className="flex fixed w-[95%] h-20 bg-[#15202b] z-50 border rounded-xl text-white justify-between">
                <div
                  className={`flex-1 transition-all ${
                    isSidebarOpen ? "ml-2" : "ml-5"
                  }`}
                >
                  <button
                    style={{ fontFamily: "PT Sans, sans-serif" }}
                    className="flex text-2xl mt-5  rounded-lg font-bold mb-2"
                    onClick={toggleSidebar}
                  >
                    <FaBars className="text-2xl mr-2  mt-1" />
                    Dashboard
                  </button>
                </div>
                <div
                  className={`flex flex-col items-center ${
                    isSidebarOpen ? "mr-52" : ""
                  }`}
                >
                  {entryData.isAdminAuthenticated && (
                    <div className="flex justify-end  mt-2">
                      <img
                        src={Profile}
                        className="w-[10px] h-[20px] mt-4 mr-1"
                        alt="profile icon"
                      ></img>
                      <Link
                        style={{ fontFamily: "PT Sans, sans-serif" }}
                        className="flex flex-col text-sm mr-10 p-3 py-1 rounded-lg font-bold mb-2"
                      >
                        {admin?.Adminname}
                        <span className="text-sm">{"(admin)"}</span>
                      </Link>
                    </div>
                  )}

                  {entryData.isAdminAuthenticated && (
                    <Link
                      onClick={entryData.AdminLogout}
                      to={"/adminlogin"}
                      className="ml-10 mr-20 text-gray-300 relative top-[-14px] left-[-35px] lg:mr-10 text-sm"
                    >
                      Logout
                    </Link>
                  )}
                  {!entryData.isAdminAuthenticated && (
                    <Link
                      to={"/adminlogin"}
                      className="ml-10 mr-20 lg:mr-10 text-sm"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
              <div
                className={`flex-1 transition-all z-0 ${
                  isSidebarOpen ? "ml-0" : "ml-0"
                }`}
              >
                <div className="flex-1 mt-24 flex-col overflow-y-scroll  transition-all">
                
                  <div className="bg-black text-white rounded-lg w-full h-[700px]">
                
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
                            Strategy:
                            <input
                              type="text"
                              id="Strategy"
                              name="Strategy"
                              value={Stratergy}
                              onChange={(e) => setStrategy(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="Script"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Script:
                            <input
                              type="text"
                              id="Script"
                              name="Script"
                              value={Script}
                              onChange={(e) => setScript(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="qty"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Quantity:
                            <input
                              type="text"
                              id="qty"
                              name="qty"
                              value={Qty}
                              onChange={(e) => setQty(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="side"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Side:
                            <select
                              id="side"
                              name="side"
                              value={Side}
                              onChange={(e) => setSide(e.target.value)}
                              className="form-select mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            >
                              <option value="BUY">BUY</option>
                              <option value="SELL">SELL</option>
                            </select>
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="entryPrice"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Entry Price:
                            <input
                              type="text"
                              id="entryPrice"
                              name="entryPrice"
                              value={EntryPrice}
                              onChange={(e) => setEntryPrice(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="exitPrice"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Exit Price:
                            <input
                              type="text"
                              id="exitPrice"
                              name="exitPrice"
                              value={ExitPrice}
                              onChange={(e) => setExitPrice(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="Status"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Status:
                            <select
                              id="Status"
                              name="Status"
                              value={Status}
                              onChange={(e) => setStatus(e.target.value)}
                              className="form-select mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            >
                              <option value="CLOSED">CLOSED</option>
                              <option value="OPEN">OPEN</option>
                            </select>
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                          Submit
                        </button>
                      </form>
                    </Modal>
                    <div className="p-3 flex justify-center">
                      <form className="w-full p-6  rounded-lg shadow-md">
                        <div className="mb-2">
                          <label
                            htmlFor="Strategy"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Service Title
                            <input
                              type="text"
                              id="Title"
                              name="Title"
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
  
                        <div className="mb-2">
                          <label
                            htmlFor="Strategy"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Service Description
                            <input
                              type="text"
                              id="Description"
                              name="pDescription"
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

                      <div className="h-[600px]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

{selectedMenuItem === "Appointment" && (
          <>
            <div className="flex flex-col  overflow-y-hidden flex-1">
              <div className="flex fixed w-[95%] h-20 bg-[#15202b] z-50 border rounded-xl text-white justify-between">
                <div
                  className={`flex-1 transition-all ${
                    isSidebarOpen ? "ml-2" : "ml-5"
                  }`}
                >
                  <button
                    style={{ fontFamily: "PT Sans, sans-serif" }}
                    className="flex text-2xl mt-5  rounded-lg font-bold mb-2"
                    onClick={toggleSidebar}
                  >
                    <FaBars className="text-2xl mr-2  mt-1" />
                    Dashboard
                  </button>
                </div>
                <div
                  className={`flex flex-col items-center ${
                    isSidebarOpen ? "mr-52" : ""
                  }`}
                >
                  {entryData.isAdminAuthenticated && (
                    <div className="flex justify-end  mt-2">
                      <img
                        src={Profile}
                        className="w-[10px] h-[20px] mt-4 mr-1"
                        alt="profile icon"
                      ></img>
                      <Link
                        style={{ fontFamily: "PT Sans, sans-serif" }}
                        className="flex flex-col text-sm mr-10 p-3 py-1 rounded-lg font-bold mb-2"
                      >
                        {admin?.Adminname}
                        <span className="text-sm">{"(admin)"}</span>
                      </Link>
                    </div>
                  )}

                  {entryData.isAdminAuthenticated && (
                    <Link
                      onClick={entryData.AdminLogout}
                      to={"/adminlogin"}
                      className="ml-10 mr-20 text-gray-300 relative top-[-14px] left-[-35px] lg:mr-10 text-sm"
                    >
                      Logout
                    </Link>
                  )}
                  {!entryData.isAdminAuthenticated && (
                    <Link
                      to={"/adminlogin"}
                      className="ml-10 mr-20 lg:mr-10 text-sm"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
              <div
                className={`flex-1 transition-all z-0 ${
                  isSidebarOpen ? "ml-0" : "ml-0"
                }`}
              >
                <div className="flex-1 mt-24 flex-col overflow-y-scroll  transition-all">
                
                  <div className="bg-black  rounded-lg w-full h-[700px]">
                
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
                            Strategy:
                            <input
                              type="text"
                              id="Strategy"
                              name="Strategy"
                              value={Stratergy}
                              onChange={(e) => setStrategy(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="Script"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Script:
                            <input
                              type="text"
                              id="Script"
                              name="Script"
                              value={Script}
                              onChange={(e) => setScript(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="qty"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Quantity:
                            <input
                              type="text"
                              id="qty"
                              name="qty"
                              value={Qty}
                              onChange={(e) => setQty(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="side"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Side:
                            <select
                              id="side"
                              name="side"
                              value={Side}
                              onChange={(e) => setSide(e.target.value)}
                              className="form-select mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            >
                              <option value="BUY">BUY</option>
                              <option value="SELL">SELL</option>
                            </select>
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="entryPrice"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Entry Price:
                            <input
                              type="text"
                              id="entryPrice"
                              name="entryPrice"
                              value={EntryPrice}
                              onChange={(e) => setEntryPrice(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="exitPrice"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Exit Price:
                            <input
                              type="text"
                              id="exitPrice"
                              name="exitPrice"
                              value={ExitPrice}
                              onChange={(e) => setExitPrice(e.target.value)}
                              className="form-input mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="Status"
                            className="block text-sm font-bold text-gray-600"
                          >
                            Status:
                            <select
                              id="Status"
                              name="Status"
                              value={Status}
                              onChange={(e) => setStatus(e.target.value)}
                              className="form-select mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            >
                              <option value="CLOSED">CLOSED</option>
                              <option value="OPEN">OPEN</option>
                            </select>
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                          Submit
                        </button>
                      </form>
                    </Modal>
                    <div className="p-3 flex justify-center">
                      <form className="w-full p-6  rounded-lg shadow-md">
                        <div className="mb-2">
                          <label
                            htmlFor="Strategy"
                            className="block text-sm font-bold "
                          >
                            Appointment Time 1
                            <input
                              type="datetime-local"
                              id="Title"
                              name="Title"
                              className="form-input mt-1 block w-60 border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
  
                        <div className="mb-2">
                          <label
                            htmlFor="Strategy"
                            className="block text-sm font-bold "
                          >
                            Appointment Time 2
                            <input
                              type="datetime-local"
                              id="Appointment Time 2"
                              name="Appointment Time 2"
                              className="form-input mt-1 block w-60 border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="Strategy"
                            className="block text-sm font-bold "
                          >
                            Appointment Time 3
                            <input
                              type="datetime-local"
                              id="Appointment Time 3"
                              name="Appointment Time 3"
                              className="form-input mt-1 block w-60 border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                          </label>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="Strategy"
                            className="block text-sm font-bold "
                          >
                            Appointment Time 4
                            <input
                              type="datetime-local"
                              id="Appointment Time 4"
                              name="Appointment Time 4"
                              className="form-input mt-1 block w-60 border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
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

                      <div className="h-[600px]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
