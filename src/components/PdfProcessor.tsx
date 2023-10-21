import { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

export const PDFProcessor = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [pdfFile, setPdfFile] = useState<any>(null);
  const history = useNavigate();
  const onDrop = (acceptedFiles: any) => {
    setPdfFile(acceptedFiles[0]);
  };

  const handleProcess = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("pdfFile", pdfFile);

      const response = await axios.post(
        "http://localhost:8000/process-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const { text } = response.data;
      setText(text);

      // Navigate to the result page upon successful processing
      history("/result");
    } catch (error) {
      console.error("Error extracting text:", error);
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div className="container mx-auto mt-8 text-center">
      <h1 className="text-2xl mb-4">Credit Report</h1>

      <div
        {...getRootProps()}
        className="dropzone py-20 border-dashed border-4"
      >
        <input {...getInputProps()} />
        <p>Select a PDF file, or Drag and drop it here</p>
      </div>

      <div className="mt-4">
        <button
          onClick={handleProcess}
          disabled={!pdfFile || loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {loading ? "Processing" : "Receive Report"}
        </button>
      </div>

      <div className="mt-4">{loading && "Extracting..."}</div>

      {text && <div className="mt-4">Extracted Text: {text}</div>}
    </div>
  );
};
