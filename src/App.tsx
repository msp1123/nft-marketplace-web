import React from "react";
import { ethers } from "ethers";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./pages/Common/ScrollToTop";
import Header from "./components/Header";
import RouteError from "./pages/Common/RouteError";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import "./styles/globals.sass"
import Footer from "./components/Footer";

function getLibrary(provider: any) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Home />} />
          <Route path="/profile" element={<Home />} />
          <Route path="/explore" element={<Home />} />
          <Route path="/marketplace" element={<Home />} />
          <Route path="*" element={<RouteError />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Footer />
      </Router>
    </Web3ReactProvider>
  );
}

export default App;
