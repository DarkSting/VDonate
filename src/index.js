import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import React, { createContext, useContext,useState } from 'react';

export const MyContext = createContext();

// Create a provider component
const ContextProvider = ({ children }) => {
  // Define the shared value
  const [color, setColor] = useState('blue');
  const [darkColor, setDarkColor] = useState('blue');

  // Define functions to update the data
  const updateData = (newColor,newDarkColor) => {
    setColor(newColor);
    setDarkColor(newDarkColor);
  };

  // Provide the value and functions through the context
  const contextValue = {
    color,
    darkColor,
    updateData,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );

};


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
