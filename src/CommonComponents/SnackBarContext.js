import { createContext, useContext, useState } from 'react';

const SnackbarContext = createContext();

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export function SnackbarProvider({ children }) {
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
    severity: 'info',
    icon: null,
    color:'#000000'
  });

  const openSnackbar = ({ message, severity, icon,color }) => {
    setSnackbarData({ open: true, message, severity, icon ,color});
  };

  const closeSnackbar = () => {
    setSnackbarData({ ...snackbarData, open: false });
  };

  const value = {
    ...snackbarData,
    openSnackbar,
    closeSnackbar,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
}