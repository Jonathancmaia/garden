import React, { createContext, useState, useEffect } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [errors, setErrors] = useState(false);
  const [successes, setSuccesses] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
    }
  }, []);

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
