import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './home.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VSCodeGUI from './VSCodeGUI.tsx';
import Editor from './components/RichText.tsx';
import { LexicalParent } from './components/Updates.tsx';

createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Home/>}/> */}
      {/* <Route path="/edit" element={<Editor2 id={1}/>}/> */}
      <Route path="/gui" element={<LexicalParent/>}/>
      <Route path="/" element={<Editor/>}/>

    </Routes>
  </BrowserRouter>
)
