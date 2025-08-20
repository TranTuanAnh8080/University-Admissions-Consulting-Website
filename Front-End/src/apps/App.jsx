import { useState } from "react";
import AppRouter from "../routes";
import { RouterProvider } from "react-router-dom";
import Chatbot from "../components/ChatBot/Chatbot";

function App() {
  return (
    <>
      <RouterProvider router={AppRouter} />
      <Chatbot />
    </>
  );
}

export default App;
