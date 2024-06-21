import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";
import { AddArticle } from "./components/AddArticle";
import { ArticleById } from "./components/ArticleById";
import { UserProvider } from "./contexts/UserContext";
import { SpecificTopicArticles } from "./components/SpecificTopicArticles";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <div id="view-window">
            <Header />
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/write_article" element={<AddArticle />}></Route>
              <Route
                path="/articles/:article_id"
                element={<ArticleById />}
              ></Route>
              <Route
                path="/articles/topics/:topic"
                element={<SpecificTopicArticles />}
              ></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
