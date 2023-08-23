import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import darkenColor from "../../CommonComponents/ColorDarker.js";
import axios from "../../api/axios";
import Spinner from "../../CommonComponents/SpinFunction";
import { NavLink, Outlet } from "react-router-dom";

export default function UserPage() {
  const [color, setColor] = useState("#1F8A70");
  const [foundUser, setUserState] = useState(false);
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let darkColor = color;

  useEffect(() => {
    axios
      .get("/admin/admindashboard")
      .then((response) => {
        setUserState(true);
        setUser(response.data.name);
        setIsLoading(true);
      })
      .catch((error) => {
        setUserState(false);
        setUser("");
        setIsLoading(false);
      });
  }, []);

  darkColor = darkenColor(darkColor, 40);

  return (
    <>
      {!foundUser ? (
        Spinner(isLoading, "Page Not Found 404", setIsLoading, "flex")
      ) : (
        <>
          <Navbar
            color={color}
            hoverColor={darkColor}
            setColor={setColor}
            name={user}
          />
          <Sidebar
            bordeColor={darkColor}
            backColor={color}
            backHoverColor={darkenColor(darkColor, 20)}
          />
        </>
      )}
    </>
  );
}
