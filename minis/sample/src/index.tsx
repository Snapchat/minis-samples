import React from "react";
import ReactDOM from "react-dom";
import Sample from "./Sample";
import reportWebVitals from "./reportWebVitals";
import SnapCanvasSDK from "./SnapCanvasSDK";

const initParams = {
  applicationId: process.env.REACT_APP_APP_ID,
  sessionId: process.env.REACT_APP_SESSION_ID,
  user: {
    id: process.env.REACT_APP_USER_ID,
  },
};
const loading = "Loading...";

ReactDOM.render(
  <React.StrictMode>
    <SnapCanvasSDK init={initParams} loading={loading}>
      {(app) => <Sample app={app} />}
    </SnapCanvasSDK>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
