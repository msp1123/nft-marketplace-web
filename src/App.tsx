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
import CreateCollection from "./pages/CreateCollection";
import CreateNft from "./pages/CreateNft";
import Marketplace from "./pages/Marketplace";
import { HealthCheck } from "./services/ApiServices";
import ContactUs from "./pages/ContactUs";

function getLibrary(provider: any) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}
HealthCheck()

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/create-nft" element={<CreateNft />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/create-collection" element={<CreateCollection />} />
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
