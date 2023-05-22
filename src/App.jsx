import Show from "./components/Show";
import Create from "./components/Create";
import Edit from "./components/Edit";

import { Toaster } from "react-hot-toast";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CrudContextProvider } from "./context/crudContext";

function App() {
  return (
    <div>
      <CrudContextProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Show />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </BrowserRouter>
      </CrudContextProvider>
    </div>
  );
}

export default App;
