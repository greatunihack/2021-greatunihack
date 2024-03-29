import React from "react";
import ReactDOM from "react-dom";
import App from "src/App";
import { AuthProvider } from "src/components/auth/AuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
