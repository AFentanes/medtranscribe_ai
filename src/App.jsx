
import React from "react";
import Routes from "./Routes";
import { AuthProvider } from "./context/AuthContext";
import Watermark from "./components/ui/Watermark";

function App() {
  return (
    <AuthProvider>
      <Watermark />
      <Routes />
    </AuthProvider>
  );
}

export default App;
