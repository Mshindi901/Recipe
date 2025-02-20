import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home.jsx"
import FormsPage from "./Pages/Forms.jsx"
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/forms" element={<FormsPage/>}/>
    </Routes>
    </>
  )
}

export default App
