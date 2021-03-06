

// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// 1. TODO - Import required model here
// e.g. import * as tfmodel from "@tensorflow-models/tfmodel";
import * as cocossd from "@tensorflow-models/coco-ssd";

import Webcam from "react-webcam";
import "./App.css";
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
import {drawRect} from "./utilities"



function App() {
  const [ notifications , setNotifications ] = useState(null)

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
     const net = await cocossd.load();
    
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 2000);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
          const obj = await net.detect(video);
          
          console.log(obj)

          if(obj.length===0){
             setNotifications("No person detected")
          }
          
          if(obj.length){
            var count=0;

            setNotifications('')
     
            obj.forEach(element => {

              if(element.class==="book")
                  setNotifications("book tho")
              
              if(element.class==="cell phone" || element.class==="laptop" )
                 setNotifications("mobile tho")
              // console.log(element.class);
              
              if(element.class==="person"){
                //  if(element.class.length>1)
                //  alert("More Than One person detected")
                count++;

                console.log(count)
                 
                if(count>1){
                   setNotifications("More Than One person detected"+count)
                }
              }
            });
          
          
          
          }

          if(count===0 || obj.length===0){
              setNotifications("No person detected")
          }


      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
      drawRect(obj,ctx)
      // setNotifications("")
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
       <div>{notifications ? notifications : '' }</div>
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;

