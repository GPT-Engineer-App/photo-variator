import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import SecondPage from "./pages/SecondPage.jsx";
import { Box } from "@chakra-ui/react";
import Navigation from "./components/Navigation";

function App() {
  return (
    <Router>
      <Box d="flex">
        <Navigation />
        <Box pl="200px" w="full">
          <Routes>
            <Route exact path="/" element={<Index />} />
            <Route path="/second-page" element={<SecondPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
