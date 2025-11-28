// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Certificates from "./pages/Certificates";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";
import Navbar from "./components/Navbar";
import Chatbot from "./pages/Chatbot";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingSpinner from "./components/LoadingSpinner";
import { supabase } from "./lib/supabase";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  // Initial full-screen loading on first visit
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Start a lightweight API call while showing spinner
    const apiCall = supabase.from("content_blocks").select("id").limit(1);

    // Wait for both API and 3s minimum spinner duration
    Promise.all([apiCall, new Promise((r) => setTimeout(r, 5000))])
      .then(() => {
        if (mounted) setInitialLoading(false);
      })
      .catch(() => {
        // In case of error, still hide spinner after delay
        if (mounted) setInitialLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Router>
      <div className="bg-zinc-800">
        {/* Fullscreen initial loading spinner */}
        {initialLoading ? (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90">
            <LoadingSpinner className="w-60 h-60" />
          </div>
        ) : (
          <Routes>
            {/* Portfolio Routes */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Hero />
                  <About />
                  <Resume />
                  <Projects />
                  <Certificates />
                  <Contact />
                  {/* <Chatbot /> */}
                </>
              }
            />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
