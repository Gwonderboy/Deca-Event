import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/Signup";
import { SignIn } from "./pages/Signin";
import { LandingPage } from "./pages/Landingpage";

function App() {
  return (
    <>
      <ToastContainer />
      <main>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
