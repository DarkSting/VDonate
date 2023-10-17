import React, { useEffect, useState } from 'react';
import './countupnumber.css'; // Import the CSS file
import {  Typography } from '@mui/material';

function AnimatedNumber({tg}) {
  const [count, setCount] = useState(0);


  useEffect(() => {
    
    // Replace 100 with the target number
    const target = tg;
    let current = 0;

    const updateCount = () => {
      if (current < target) {
        current += 1;
        setCount(current);
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, []);

  return (
    <div className="animated-number">
      <Typography variant="h1" >{count}</Typography>
    </div>
  );
}

export default AnimatedNumber;
