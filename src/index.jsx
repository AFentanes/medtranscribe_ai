import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Watermark from "./components/ui/Watermark";
import "./styles/tailwind.css";
import "./styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<>
	<Watermark />
	<App />
</>);
