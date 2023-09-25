import { Button } from "@mui/material";
import { useState } from "react";
import Axios from "axios";

const sendData = (setData) => {
  const data = {
    receiver: "akeeshjaden320@gmail.com",
    code: "hello world",
    title: "this is a post request",
    intro: "testing a post request",
    data: [],
    instructions: "click here to gain more details",
    buttontxt: "get QR",
  };

  const jsonformat = JSON.stringify(data);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  Axios.post("/sendmail", jsonformat, config)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export default function SendMail() {
  const [data, setData] = useState("send mail");

  const getData = () => {
    Axios.get("/", { name: "akas", id: "1234" })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Button variant="contained" onClick={sendData}>
        {" "}
        {data}
      </Button>
    </>
  );
}
