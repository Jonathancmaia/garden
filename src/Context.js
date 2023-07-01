import React, { createContext, useState } from "react";
import Axios from "axios";

const Context = createContext();
const url = "https://demo7088624.mockable.io/api";

export const ContextProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [successes, setSuccesses] = useState([]);
  const [isLogged, setIsLogged] = useState(() => {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  });

  const Request = async (method, path, params, isAuth)=>{
    try {
      const response = await Axios(url + path, {
        method: method,
        params: params,
        headers: isAuth ? { token: "bearer " + localStorage.getItem('token') } : {}
      });
  
      if (response.data.errors) {
        setErrors([...errors, response.data.errors[0]]);
        return false;
      } else if (response.data.successes) {
        setSuccesses([...successes, response.data.successes[0]]);
        return response.data;
      }
    } catch (e) {
      setErrors([...errors, { message: e.message }]);
      return false;
    }
  }

  return (
    <Context.Provider
      value={{
        errors,
        setErrors,
        successes,
        setSuccesses,
        isLogged,
        setIsLogged,
        Request
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
