import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './home.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editor2 from './editing.tsx'
// import Editor from './components/lexical.tsx'
import VSCodeGUI from './VSCodeGUI.tsx';
import RichText from './components/RichText.tsx';

createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Home/>}/> */}
      <Route path="/edit" element={<Editor2 id={1}/>}/>
      <Route path="/gui" element={<VSCodeGUI/>}/>
      <Route path="/" element={<RichText/>}/>

    </Routes>
  </BrowserRouter>
)
