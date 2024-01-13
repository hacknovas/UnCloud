import { useEffect } from "react";
import { createContext, useState } from "react";

export const CloudContext = createContext();

const Provider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState();

  useEffect(() => {
  }, []);

  return (
    <CloudContext.Provider value={{ signer, setSigner, address, setAddress }}>
      {children}
    </CloudContext.Provider>
  );
};

export default Provider;
