import { createContext, useContext, useState } from "react";

const SubtoolContext = createContext();

export const useSubtool = () => useContext(SubtoolContext);

export function SubtoolProvider({ children }) {
  const [selectedSubtool, setSelectedSubtool] = useState("");

  return (
    <SubtoolContext.Provider value={{ selectedSubtool, setSelectedSubtool }}>
      {children}
    </SubtoolContext.Provider>
  );
}
