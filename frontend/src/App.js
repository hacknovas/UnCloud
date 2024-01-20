import Login from "./page/Login";
import Upload from "./page/Upload";
import FileList from "./page/FileList";
import ReceivedFiles from "./page/ReceivedFiles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./page/Register";
import Layout from "./page/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route path="/upload" element={<Upload />} />
            <Route path="/managefiles" element={<FileList />} />
            <Route path="/recievedfile" element={<ReceivedFiles />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
