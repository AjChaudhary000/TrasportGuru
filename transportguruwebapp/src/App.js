import React from "react";
import Router from "./Router/router";


function App() {
    React.useEffect(()=>{
        const OneSignal =   window.OneSignal = window.OneSignal || [];
        OneSignal.push(function() {
            OneSignal.init({
                appId: "b45c472c-7549-4083-b1dc-0740f2cbd256",
                // Your other init settings
            });
        });
        OneSignal.getUserId().then(function(userId) {
            console.log("OneSignal User ID:", userId);
            // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316
        });
    },[])
  return (
    <div>
      <Router />
    </div>
  );
}
export default App;
