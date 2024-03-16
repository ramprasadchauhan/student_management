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

import ShowStudent from "./pages/ShowStudent";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-student" element={<CreateStudent />} />
          <Route path="/update-student/:studentId" element={<EditStudent />} />
          {/* <Route
            path="/delete-student/:studentId"
            element={<DeleteStudent />}
          /> */}
        </Route>
        <Route path="/show-student/:studentId" element={<ShowStudent />} />

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
