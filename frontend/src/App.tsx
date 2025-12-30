import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";
import Navbar from "./components/Navbar";
import HomeView from "./views/HomeView";
import FormView from "./views/FormView";
import { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    // Initialize Flowbite JS to enable tooltips/popovers
    initFlowbite();
  }, []);
  return (
    <>
      <Navbar />
      <Toaster position="bottom-center" />
      <main className="pt-24 px-8">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/add" element={<FormView />} />
          <Route path="/edit/:id" element={<FormView />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
