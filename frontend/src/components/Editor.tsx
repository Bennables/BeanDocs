import './Editor.css';

interface File {
    id: string;
    name: string;
    path: string;
    content: string;
    language: string;
}

interface EditorProps {
    file: File;
    onChange: (content: string) => void;
}

export default function Editor({ file, onChange }: EditorProps) {
    const lines = file.content.split('\n');

    return (
        <div className="editor">
            <div className="editor-content">
                <div className="line-numbers">
                    {lines.map((_, index) => (
                        <div key={index} className="line-number">
                            {index + 1}
                        </div>
                    ))}
                </div>

                <textarea
                    className="editor-textarea"
                    value={file.content}
                    onChange={(e) => onChange(e.target.value)}
                    spellCheck="false"
                />

                <pre className="editor-highlight">
                    <code>{file.content}</code>
                </pre>
            </div>

        </div>
    );
}
