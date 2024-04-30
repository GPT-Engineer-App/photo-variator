import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
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
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
