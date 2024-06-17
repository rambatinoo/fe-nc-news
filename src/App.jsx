import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";
import { AddArticle } from "./components/AddArticle";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/write_article" element={<AddArticle />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
