import { useState } from 'react';
import Sidebar from './Sidebar';
import FileExplorer from './FileExplorer';
// import Editor from './components/Editor';
import './VSCodeGUI.css';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import Editor from "./RichText"

interface File {
    id: string;
    name: string;
    path: string;
    content: string;
    language: string;
}

export default function VSCodeGUI( {onChange}: any) {

    // this one uses premade files
    // useState is a file array
    
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


    // this documents open files
    // gets the file too
    const [openTabs, setOpenTabs] = useState<File[]>([files[0]]);
    const [activeTab, setActiveTab] = useState<string>(files[0].id);
    const [selectedFile, setSelectedFile] = useState<File | null>(files[0]);

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);

        //find the tab that you want and set it active
        if (!openTabs.find(t => t.id === file.id)) {
            setOpenTabs([...openTabs, file]);
        }
        setActiveTab(file.id);
    };

    //
    const handleCloseTab = (fileId: string) => {
        //remove the one you wanna close
        const newTabs = openTabs.filter(t => t.id !== fileId);
        //update openTabs
        setOpenTabs(newTabs);

        //sets active tab to 0
        if (activeTab === fileId && newTabs.length > 0) {
            setActiveTab(newTabs[0].id);
            setSelectedFile(newTabs[0]);
        }
    };

    // THIS IS THE UPDATE FUNCTION. WE"RE GONNA NEED TO DO SOME INTEGRATION HERE
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

            {/* We don't need the sidebar yet, probably won't need it at all */}
            {/* <Sidebar /> */}

            <div className="main-content">

                {/* This is the file directory */}
                <div className="sidebar-panel">
                    <FileExplorer files={files} onFileSelect={handleFileSelect} selectedFile={selectedFile} />
                </div>

                
                {/* this part actually edits */}
                <div className="editor-pane">
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
                                </button>
                            </div>
                        ))}
                    </div>

                    {selectedFile ? (
                        <Editor onChange={onChange}/>
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
