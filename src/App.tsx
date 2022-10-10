import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Container from "@mui/material/Container";
import Navbar from "./components/Navbar";
import About from "./pages/About";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games/dice-game/build/" element={<Home />} />
          <Route path="/rules" element={<About />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
