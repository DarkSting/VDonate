import ReactDOM from "react-dom/client";
import App from "./App";
import React, { createContext,useState } from 'react';
import { SnackbarProvider } from "./CommonComponents/SnackBarContext";

export const MyContext = createContext();

// Create a provider component
const ContextProvider = ({ children }) => {
  // Define the shared value
  const [color, setColor] = useState('blue');
  const [darkColor, setDarkColor] = useState('blue');
  const [name, setName] = useState('');
  const [userID,setUserID] = useState('');

  // Define functions to update the data
  const updateData = (newColor,newDarkColor) => {
    setColor(newColor);
    setDarkColor(newDarkColor);
  };

  const updateUser = (username) => {
    setName(username);
  };

  const updateUserID = (userID)=>{
    setUserID(userID);
  }
  
  // Provide the value and functions through the context
  const contextValue = {
    color,
    darkColor,
    name,
    userID,
    updateData,
    updateUser,
    updateUserID
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );

};


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ContextProvider>
      <SnackbarProvider >
        <App />
      </SnackbarProvider>
    </ContextProvider>
);
