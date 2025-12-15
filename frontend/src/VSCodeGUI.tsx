import { useState } from 'react';
import Sidebar from './components/Sidebar';
import FileExplorer from './components/FileExplorer';
import Editor from './components/Editor';
import './VSCodeGUI.css';

interface File {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
}

export default function VSCodeGUI() {
  const [files, setFiles] = useState<File[]>([
    {
      id: '1',
      name: 'index.ts',
      path: 'src/index.ts',
      content: 'import express from "express";\n\nconst app = express();\napp.listen(3000);',
      language: 'typescript'
    },
    {
      id: '2',
      name: 'App.tsx',
      path: 'src/App.tsx',
      content: 'export default function App() {\n  return <h1>Hello World</h1>;\n}',
      language: 'typescript'
    },
    {
      id: '3',
      name: 'package.json',
      path: 'package.json',
      content: '{\n  "name": "beandocs",\n  "version": "1.0.0"\n}',
      language: 'json'
    }
  ]);

  const [openTabs, setOpenTabs] = useState<File[]>([files[0]]);
  const [activeTab, setActiveTab] = useState<string>(files[0].id);
  const [selectedFile, setSelectedFile] = useState<File | null>(files[0]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    
    if (!openTabs.find(t => t.id === file.id)) {
      setOpenTabs([...openTabs, file]);
    }
    setActiveTab(file.id);
  };

  const handleCloseTab = (fileId: string) => {
    const newTabs = openTabs.filter(t => t.id !== fileId);
    setOpenTabs(newTabs);
    
    if (activeTab === fileId && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
      setSelectedFile(newTabs[0]);
    }
  };

  const handleContentChange = (content: string) => {
    if (selectedFile) {
      const updatedFiles = files.map(f =>
        f.id === selectedFile.id ? { ...f, content } : f
      );
      setFiles(updatedFiles);
      setSelectedFile({ ...selectedFile, content });
    }
  };

  return (
    <div className="vscode-container">
      <Sidebar />
      
      <div className="main-content">
        <div className="sidebar-panel">
          <FileExplorer files={files} onFileSelect={handleFileSelect} selectedFile={selectedFile} />
        </div>

        <div className="editor-panel">
          <div className="tabs">
            {openTabs.map(tab => (
              <div
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedFile(tab);
                }}
              >
                <span className="tab-name">{tab.name}</span>
                <button
                  className="tab-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseTab(tab.id);
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {selectedFile ? (
            <Editor
              file={selectedFile}
              onChange={handleContentChange}
            />
          ) : (
            <div className="no-file-selected">
              <p>No file selected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
