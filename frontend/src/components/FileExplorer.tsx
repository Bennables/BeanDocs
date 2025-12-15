import { useState } from 'react';
import './FileExplorer.css';

interface File {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
}

interface FileExplorerProps {
  files: File[];
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export default function FileExplorer({ files, onFileSelect, selectedFile }: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']));

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  const getFileIcon = (language: string) => {
    const icons: Record<string, string> = {
      typescript: '⌘',
      javascript: 'ƒ',
      json: '{}',
      tsx: '⟨⟩',
      css: '◆',
      default: '📄'
    };
    return icons[language] || icons.default;
  };

  const getRootFolders = () => {
    const folderMap: Record<string, File[]> = {};
    
    files.forEach(file => {
      const folder = file.path.split('/')[0];
      if (!folderMap[folder]) {
        folderMap[folder] = [];
      }
      folderMap[folder].push(file);
    });

    return folderMap;
  };

  const folders = getRootFolders();

  return (
    <div className="file-explorer">
      <div className="explorer-header">
        <h2>Explorer</h2>
      </div>
      
      <div className="file-tree">
        {Object.entries(folders).map(([folder, folderFiles]) => (
          <div key={folder}>
            <div
              className="folder-item"
              onClick={() => toggleFolder(folder)}
            >
              <span className="folder-icon">
                {expandedFolders.has(folder) ? '▼' : '▶'}
              </span>
              <span className="folder-name">{folder}</span>
            </div>

            {expandedFolders.has(folder) && (
              <div className="folder-contents">
                {folderFiles.map(file => (
                  <div
                    key={file.id}
                    className={`file-item ${selectedFile?.id === file.id ? 'selected' : ''}`}
                    onClick={() => onFileSelect(file)}
                  >
                    <span className="file-icon">{getFileIcon(file.language)}</span>
                    <span className="file-name">{file.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
