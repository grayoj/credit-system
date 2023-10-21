import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PDFProcessor } from "./components/PdfProcessor";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PDFProcessor />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
