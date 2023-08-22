export default function darkenColor(hexCode,factor,op=0){

    hexCode = hexCode.replace("#","");

    let redChannel = parseInt(hexCode.substring(0,2),16);
    let greenChannel = parseInt(hexCode.substring(2,4),16);
    let blueChannel = parseInt(hexCode.substring(4,6),16);

    redChannel = Math.max(0, redChannel - factor);
    greenChannel = Math.max(0, greenChannel - factor);
    blueChannel = Math.max(0, blueChannel - factor);

    if(op===0){

        var darkHex = '#' + padZero(redChannel.toString(16)) + padZero(greenChannel.toString(16)) + padZero(blueChannel.toString(16));
        return darkHex;
    }

    const opacity = op.toString();

    var darkHex = '#' + padZero(redChannel.toString(16)) + padZero(greenChannel.toString(16)) + padZero(blueChannel.toString(16))+opacity;
    return darkHex;
  
    // Convert the darkened RGB values back to hex
    
  
   


}

function padZero(str) {
    return ('00' + str).slice(-2);
  }