import React, { useState, useEffect } from "react";
import { ReactInternetSpeedMeter } from "react-internet-meter";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./WifiPing.css";

const WifiPing = () => {
  const [wifiSpeed, setWifiSpeed] = useState(0); // State to store internet speed
  const [isLoading, setIsLoading] = useState(true); // State for loading spinner
  const [unit, setUnit] = useState("KB/s"); // State to store the unit (KB/s or MB/s)

  // Callback to handle the speed test results
  const handleSpeedTest = (speed) => {
    const numericSpeed = parseFloat(speed) || 0; // Convert speed to a number
    setWifiSpeed(numericSpeed);

    // Determine the unit dynamically
    if (numericSpeed >= 1024) {
      setWifiSpeed(numericSpeed / 1024); // Convert to MB
      setUnit("MB/s");
    } else {
      setUnit("KB/s");
    }

    setIsLoading(false);
  };

  // Choose icon and color based on speed
  const getSpeedIcon = () => {
    if (wifiSpeed === 0) {
      return <i className="fas fa-spinner fa-spin fa-2x"></i>; // Loading spinner
    } else if (wifiSpeed < 1) {
      return <i className="fas fa-wifi fa-2x text-danger"></i>; // Low speed
    } else if (wifiSpeed < 3) {
      return <i className="fas fa-wifi fa-2x text-warning"></i>; // Moderate speed
    } else {
      return <i className="fas fa-wifi fa-2x text-success"></i>; // Good speed
    }
  };

  useEffect(() => {
    if (wifiSpeed > 0) {
      setIsLoading(false);
    }
  }, [wifiSpeed]);

  return (
    <div className="wifi-container">
      {/* Real-time Ping Display */}
      <div className="ping-indicator text-center">
        {isLoading ? (
          <i className="fas fa-spinner fa-spin fa-2x"></i>
        ) : (
          <div>
            <div>{getSpeedIcon()}</div>
            <span>
              {wifiSpeed.toFixed(2)} {unit} {/* Dynamically display unit */}
            </span>
          </div>
        )}
      </div>

      {/* ReactInternetSpeedMeter Component */}
      <ReactInternetSpeedMeter
        txtSubHeading={`Internet speed: ${wifiSpeed.toFixed(2)} ${unit}`}
        outputType="alert"
        customClassName="custom-speed-meter"
        txtMainHeading="Oops..."
        pingInterval={1000} // Ping every second
        thresholdUnit="kilobyte" // Use "kilobyte" for default unit
        threshold={3} // Speed threshold
        imageUrl="https://www.sammobile.com/wp-content/uploads/2019/03/keyguard_default_wallpaper_silver.png"
        downloadSize="2550420" // File size in bytes
        callbackFunctionOnNetworkDown={(speed) =>
          console.log(`Internet s eed i  d wn: $ speed}`)
        }
        callbackFunctionOnNetworkTest={handleSpeedTest}
      />
    </div>
  );
};

export default WifiPing;

// import React, { useState, useEffect } from "react";
// import { FaWifi } from "react-icons/fa"; 

// const InternetSpeedMonitor = () => {
//   const [ping, setPing] = useState("Calculating...");
//   const [wifiStatus, setWifiStatus] = useState("gray"); 

//   const measurePing = async () => {
//     const pingUrl = "http://localhost:3000/";
//     const startTime = performance.now();
//     try {
//       await fetch(pingUrl, { method: "HEAD", cache: "no-cache" });
//       const endTime = performance.now();
//       const latency = endTime - startTime;
//       setPing(latency.toFixed(2) + " ms");
//       updateWifiStatus(latency); 
//     } catch (error) {
//       console.error("Ping Error:", error.message);
//       setPing("Error");
//       setWifiStatus("red"); 
//     }
//   };
//   const updateWifiStatus = (latency) => {
//     if (latency < 50) {
//       setWifiStatus("green");
//     } else if (latency >= 50 && latency <= 150) {
//       setWifiStatus("yellow"); 
//     } else {
//       setWifiStatus("red"); 
//     }
//   };
//   useEffect(() => {
//     const interval = setInterval(() => {
//       measurePing();
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <div>
//         <FaWifi
//           style={{
//             fontSize: "50px",
//             color: wifiStatus,
//             marginBottom: "10px",
//           }}
//         />
//       </div>
//       <p><strong>Ping (Latency):</strong> {ping}</p>
//     </div>
//   );
// };

// export default InternetSpeedMonitor;
