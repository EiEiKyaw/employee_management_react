import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import EmpDetail from "./pages/EmpDetail";
import EmpAdd from "./pages/EmpAdd";
import EmpList from "./pages/EmpList";
import AppSettings from "./pages/AppSettings";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/employee/all" element={<EmpList />} />
            <Route exact path="/employee/add" element={<EmpAdd />} />
            <Route exact path="/employee/detail/:id" element={<EmpDetail />} />
            <Route exact path="/setting" element={<AppSettings />} />
          </Route>
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
