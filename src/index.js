import ReactDOM from "react-dom/client";
import App from "./App";
import React, { createContext,useEffect,useState } from 'react';
import { SnackbarProvider } from "./CommonComponents/SnackBarContext";

export const MyContext = createContext();

// Create a provider component
const ContextProvider = ({ children }) => {
  // Define the shared value
  const [color, setColor] = useState('blue');
  const [darkColor, setDarkColor] = useState('blue');
  const [name, setName] = useState('');
  const [userID,setUserID] = useState('');
  const [userlocation,setUserLocation] = useState(null)
  // Define functions to update the data
  const updateData = (newColor,newDarkColor) => {
    setColor(newColor);
    setDarkColor(newDarkColor);
  };

  useEffect(()=>{

    if(localStorage.getItem('userInfo')){
      const {data} = JSON.parse(localStorage.getItem('userInfo'))
     setName(data?.name)
      updateUserID(data?.id)
      console.log(data)
      const lc = {
        lat:data?.location.latitude,
        lng:data?.location.longitude
      }
      setUserLocation(lc)
  
      console.log(lc)
    }

  }
  ,[])

  const setLocation=(latitude,longitutde)=>{

    console.log(latitude)
    console.log(longitutde)

    const dt = {
      lat:latitude,
      lng:longitutde
    }

    setUserLocation('hello')

  }

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
    userlocation,
    updateData,
    updateUser,
    updateUserID,
    setLocation
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
