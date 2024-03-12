import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

import Header from "./components/Header";
import About from "./pages/About";
import PrivateRoute from "./components/PrivateRoute";

import CreateStudent from "./pages/CreateStudent";
import EditStudent from "./pages/EditStudent";
import DeleteStudent from "./pages/DeleteStudent";
import ShowStudent from "./pages/ShowStudent";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student/create" element={<CreateStudent />} />
          <Route path="/student/edit/:id" element={<EditStudent />} />
          <Route path="/student/delete/:id" element={<DeleteStudent />} />
        </Route>
        <Route path="/student/details/:id" element={<ShowStudent />} />

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
