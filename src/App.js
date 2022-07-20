import React, {useState,useEffect} from 'react';
import Header from './component/Header';
import Randomchar from './component/RandomChar';
import DisplayComponent from './component/DisplayComponent';
import BtnComponent from './component/BtnComponent';
import './App.css';

function App() {
  const [time, setTime] = useState({ms:0, s:0, m:0, h:0,sc:0});
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charlen = characters.length;
  const firstchar = characters.charAt(Math.floor(Math.random() * charlen))
  
  const [disaleInputField,sedisaleInputField] = useState(true);
  const [randomchar,setrandomchar] = useState(firstchar);
  const [counter,setCounter]= useState(1);
  const [typedvalue,setTypedValue] = useState('')
  const [givenValue,setGivenValue] = useState(firstchar)
  const [bestTime,setBestTime] = useState({ms:0, s:0, m:0, h:0,sc:0})

  const start = () => {
    sedisaleInputField(false);
    run(1);
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  const startFist = () =>{
    setrandomchar(characters.charAt(Math.floor(Math.random() * charlen)));
    start();
  }
  var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h,score = time.sc;

  const run = (setval) => {
    if(setval === undefined){
      setval = 1
    }

    if(updatedM === 60){
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60){
      updatedM++;
      updatedS = 0;
    }
    if(updatedMs >= 100){
      updatedS++;
      updatedMs = updatedMs - 100;

    }
    updatedMs += setval;
    score += setval
    return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH, sc : score});
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const resume = () => start();

  const reset = () => {
    sedisaleInputField(true);
    setCounter(0)
    clearInterval(interv);
    setStatus(0);
    setTime({ms:0, s:0, m:0, h:0,sc:0})
    setTypedValue("")
    setrandomchar("Click On Start to Start Game")
    const data = window.localStorage.getItem('Total_Time')   
    if(data){
      setBestTime(JSON.parse(data))
    }
  
  };

  const handleInput = (e)=>{
    let lastval = e.target.value
    let lenLastval = lastval.length
    setTypedValue(e.target.value)
    stop();
    if(lastval[lenLastval-1]){    
        if(lastval[lenLastval-1] === randomchar){
            setCounter(counter+1)
            if(counter === 20){
                stop();
                if(time.sc <= bestTime.sc){
                    setrandomchar("Success!")
                    window.localStorage.setItem('Total_Time',JSON.stringify(time))
                }else{
                    setrandomchar("Failure!")
                }
                
            }else{
                const value = characters.charAt(Math.floor(Math.random() * charlen))
                setrandomchar(value)
                setGivenValue(givenValue+value)
                resume()
            }
        }else{
          run(50)
          resume()
        }

    }else{
      resume()
    }
    
}
  useEffect(()=>{
      reset();
      const data = window.localStorage.getItem('Total_Time')
      
      if(data){
        setBestTime(JSON.parse(data))
      }else{
        bestTime.sc = 10000000000
        window.localStorage.setItem('Total_Time',JSON.stringify(bestTime))
      }
  },[])
  return (
    <>
      <div className='App'>
        <Header />
        <Randomchar value = {randomchar} />
        <div className="main-section">
        <div className="clock-holder">
              <div className="stopwatch">
                  <DisplayComponent time={time}/>
                  <input className="stopwatch-input" value={typedvalue} disabled={disaleInputField}  onChange={handleInput} placeholder="Type here ...." />
                  <BtnComponent status={status} resume={resume} reset={reset} stop={stop} start={startFist}/>
                  
              </div>
        </div>
        <div className="show_time">
          <span>My Best Time -</span> &nbsp;
          <span>{(bestTime.m >= 10)? bestTime.m : "0"+ bestTime.m}</span>&nbsp;:&nbsp;
          <span>{(bestTime.s >= 10)? bestTime.s : "0"+ bestTime.s}</span>&nbsp;:&nbsp;
          <span>{(bestTime.ms >= 10)? bestTime.ms : "0"+ bestTime.ms}</span>
        </div>
        </div>
      </div>
      
    </>
    
  );
}

export default App;