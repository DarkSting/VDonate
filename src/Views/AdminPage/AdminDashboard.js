import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { useContext, useEffect, useState } from "react";
import darkenColor from "../../CommonComponents/ColorDarker.js";
import axios from "../../api/axios";
import Spinner from "../../CommonComponents/SpinFunction";
import { MyContext } from "../../index";

export default function UserPage() {
  const [color, setColor] = useState("#1F8A70");
  const [foundUser, setUserState] = useState(false);
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser,updateUserID } = useContext(MyContext);

  let darkColor = color;

  useEffect(() => {
    axios
      .get("/admin/admindashboard")
      .then((response) => {
        setUserState(true);
        setUser(response.data.name);
        setIsLoading(true);
        updateUser(response.data.name);
        updateUserID(response.data.id)
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
