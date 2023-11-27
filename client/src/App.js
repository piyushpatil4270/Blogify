import { autoBatchEnhancer } from "@reduxjs/toolkit";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Authregister from "./Components/pages/authentication/Authregister";
import Editpost from "./Components/pages/editpost/Editpost";
import Homepage from "./Components/pages/home/Homepage";
import Postdisplay from "./Components/pages/postdisply/Postdisplay";
import Write from "./Components/pages/write/Write";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/pages/authentication/Login";
import { Usercontextprovider } from "./Components/pages/Usercontext";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Usercontextprovider>
        <Navbar />
        <Routes>
          <Route path="/" Component={Homepage} />
          <Route path="/createpost" Component={Write} />
          <Route path="/login" Component={Login} />
          <Route path="/:id" Component={Postdisplay} />
          <Route path="/register" Component={Authregister} />
          <Route path="/editpost/:id" Component={Editpost} />
        </Routes>
        </Usercontextprovider>
      </BrowserRouter>
    </div>
  );
}

export default App;
