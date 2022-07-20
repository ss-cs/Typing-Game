import React from 'react';

function BtnComponent(props) {

  return (
    <div>

      {(props.status === 0)? 
        <button className="stopwatch-btn stopwatch-btn-pink"
        onClick={props.start}>Start</button> : ""
      }

      {(props.status === 1 || props.status === 2)? 
        <div>
          <button className="stopwatch-btn stopwatch-btn-yel"
                  onClick={props.reset}>Reset</button>
        </div> : ""
      }
    </div>
  );
}

export default BtnComponent;