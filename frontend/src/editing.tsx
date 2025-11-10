import { useSearchParams } from "react-router-dom";
import Editor from "./EditFile"
import { useState } from "react";

const Editor2 = () => { 
    
    const [editorState, setEditorState] = useState("");

    const onChange = (editorState: any) => {
        // Call toJSON on the EditorState object, which produces a serialization safe string
        const editorStateJSON = editorState.toJSON();
        // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
        setEditorState(JSON.stringify(editorStateJSON));
        console.log(editorState._nodeMap[0]);
      }


    return(
        <Editor onChange={onChange}/>
    )
}


export default Editor2;