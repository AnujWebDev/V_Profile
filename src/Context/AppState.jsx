import React, { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";

const AppState = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [entry, setEntry] = useState([]);
  const [reload,setReload]=useState(false)
  const [id,setId]=useState('');
  const [user, setUser] = useState("");
  const [admin, setAdmin] = useState("");
  const [AllUsers,setAllusers]=useState([])

  const url = "http://localhost:4000/api";

  useEffect(() => {
    const fetchEntries = async () => {
      const api = await axios.get(`${url}/getentries`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.entries);
      setEntry(api.data.entries);
    };
    fetchEntries();
    const jwtToken = window.localStorage.getItem("token");
    setToken(jwtToken);
    if (token) {
      setIsAuthenticated(true);
      setIsAdminAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setIsAdminAuthenticated(false);
    }
  }, [token,reload]);

  const register = async ({ name, email, password, phone }) => {
    try {
      const api = await axios.post(
        `${url}/register`,
        { name, email, password, phone },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Registration Response:", api.data);
      return api.data;
    } catch (error) {
      if (error.response) {
        console.log("Error response status:", error.response.status);
        console.log("Response data:", error.response.data);
        return error.response.data;
      } else if (error.request) {
        console.log("No response received");
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  const Login = async (email, password) => {
    try {
      const api = await axios.post(
        `${url}/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(api.data);
      window.localStorage.setItem("token", api.data.token);
      setToken(api.data.token);
      return api.data;
    } catch (error) {
      if (error.response) {
        console.log("Error response status:", error.response.status);
        console.log("Response data:", error.response.data);
        return error.response.data;
      } else if (error.request) {
        console.log("No response received");
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  const AdminLogin = async (Adminemail, Adminpassword) => {
    try {
      const api = await axios.post(
        `${url}/admin/login`,
        {
          Adminemail,
          Adminpassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(api.data);
      //setting to local storage
      window.localStorage.setItem("token", api.data.token);
      setToken(api.data.token);
      return api.data;
    } catch (error) {
      if (error.response) {
        console.log("Error response status:", error.response.status);
        console.log("Response data:", error.response.data);
        return error.response.data;
      } else if (error.request) {
        console.log("No response received");
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  const Logout = () => {
    window.localStorage.removeItem("token");
    setToken("");
    isAuthenticated(false);
  };
  const AdminLogout = () => {
    window.localStorage.removeItem("token");
    setToken("");
    isAdminAuthenticated(false);
  };


  useEffect(() => {
    const myProfile = async () => {
      const api = await axios.get(`${url}/profile`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      console.log(api.data);
      setUser(api.data.user);
    };
    myProfile();
  }, [token,reload]);


  useEffect(() => {
    const adminProfile = async () => {
      const api = await axios.get(`${url}/admin/profile`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      console.log(api.data);
      setAdmin(api.data.admin);
    };
    adminProfile();
  }, [token]);

  
  
  const addEntry=async({Stratergy,Script,Qty,Side,EntryPrice,ExitPrice,Status,Pnl,Package})=>{
    const api = await axios.post(`${url}/addentry`,{
      Stratergy,Script,Qty,Side,EntryPrice,ExitPrice,Status,Pnl,Package
    }, {
      headers: {
        "Content-Type": "application/json",
        "Auth":token
      },
      withCredentials: true,
    });
    console.log(api)
    return api.data
  }


  // const updateEntry=async(id)=>{
  //   const api = await axios.put(
  //     `${url}/entry/${id}`,
  //     {
  //       Stratergy,Script,Qty,Side,EntryPrice,ExitPrice,Status
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Auth:token
  //       },
  //       withCredentials: true,
  //     }
  //   );

  //   console.log(api);
  // }

  const DeleteEntry=async(id)=>{
    const api =await axios.delete(`${url}/entry/${id}`,{
      headers: {
        "Content-Type": "application/json",
        Auth:token,
      },
      withCredentials: true,
    })
    console.log(api);
    return api.data
  }

  // console.log("id is coming",id)

  useEffect(() => {
    const fetchAllUsers = async () => {
      const api = await axios.get(`${url}/users`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setAllusers(api.data.user);
    };
    fetchAllUsers();

    
  }, [reload]);

  const getUserById=async(id)=>{
    const api =await axios.get(`${url}/user/${id}`,{
      headers: {
        "Content-Type": "application/json",
        Auth:token,
      },
      withCredentials: true,
    })
    console.log(api);
    return api.data
  }

  return (
    <AppContext.Provider
      value={{
        register,
        Login,
        entry,
        Logout,
        AdminLogout,
        isAuthenticated,
        setIsAuthenticated,
        user,
        admin,
        AdminLogin,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        addEntry,
        reload,setReload,
        // updateEntry,
        DeleteEntry,
        id,setId,
        url,
        token,
        AllUsers,
        getUserById
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;