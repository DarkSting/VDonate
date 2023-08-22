import { useEffect, useState } from 'react';

  
function QR(props) {
  const [temp, setTemp] = useState("");
  const [word, setWord] = useState(props.ry);
  const [size, setSize] = useState(250);
  const [bgColor, setBgColor] = useState("ffffff");
  const [qrCode, setQrCode] = useState("");
  
  // Changing the URL only when the user
  // changes the input
  useEffect(() => {
    setQrCode
 (`http://api.qrserver.com/v1/create-qr-code/?data=${word}!&size=250x250&bgcolor=ffffff`);
  }, [word, size, bgColor]);
  
  // Updating the input word when user
  // click on the generate button
  
  return (
    <div className="App">
      <div className="input-box">
        <div className="gen">
         
        </div>

      </div>
      <div className="output-box">
        <img src={qrCode} alt="" />
        <p>{qrCode}</p>
      </div>
    </div>
  );
}
  
export default QR;