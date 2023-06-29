import React, { createContext, useState, useEffect } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [successes, setSuccesses] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
    }
  }, []);

  useEffect(() => {
    if (successes.length > 0) {
      setTimeout(() => {
        setSuccesses(successes.slice(1));
      }, 5000);
    }
  }, [successes]);

  useEffect(() => {
    if (errors.length > 0) {
      setTimeout(() => {
        setSuccesses(errors.slice(1));
      }, 5000);
    }
  }, [errors]);

  return (
    <Context.Provider
      value={{
        errors,
        setErrors,
        successes,
        setSuccesses,
        isLogged,
        setIsLogged,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
