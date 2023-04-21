import { createContext, useContext, useState } from "react";

const landContext = createContext();

const LandProvider = ({ children }) => {
  const [LI_page, setLIPage] = useState(0);
  const [CO_page, setCOPage] = useState(0);
  const [User_page, setUserPage] = useState(0);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  return (
    <landContext.Provider
      value={{
        LI_page,
        setLIPage,
        CO_page,
        setCOPage,
        User_page,
        setUserPage,
        provider,
        setProvider,
        signer,
        setSigner,
        contract,
        setContract,
      }}
    >
      {children}
    </landContext.Provider>
  );
};

export const LandState = () => {
  return useContext(landContext);
};

export default LandProvider;
