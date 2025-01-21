import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import DataEntryWeek from "./pages/DataEntryWeek.tsx";
import Test from "./pages/Test.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="dataentryweek" element={<DataEntryWeek />} />
      <Route path="test" element={<Test />} />
    </Routes>
  </BrowserRouter>
);
