import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import { getUserInfo } from "./lib/api/auth";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} setUser={setUser} />}>
            <Route index element={<Home user={user} />} />
            <Route path="detail/:id" element={<Detail />} />
            <Route
              path="/profile"
              element={<Profile user={user} setUser={setUser} />}
            />
          </Route>
          <Route path="/sign_in" element={<SignIn setUser={setUser} />} />
          <Route path="/sign_up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
