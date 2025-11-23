import { useSearchParams } from "react-router-dom";
import Editor from "./EditFile"
import { useEffect, useState } from "react";
import axios from "axios";
// import { defineConfig, loadEnv } from 'vite';


const Editor2 = ( props : any) => { 

    const [editorState, setEditorState] = useState("");
    const url = import.meta.env.VITE_BASE_LINK;
    

    useEffect(() =>{
        const push = async() =>{
            console.log("pushinggg");
            console.log(url);

            axios.post(`${url}/${props.id}`,{data : editorState}, { timeout: 3000 }) // Sets a timeout of 3 seconds for this specific request
            .then(response => {
                // Handle success
                console.log("SUCCESS");
            })
            .catch(error => {
                // Handle timeout or other errors
                console.log(error)
            });

        }

        const intervalId = setInterval(push, 3000);


        return () => clearInterval(intervalId);

    }, [editorState, 3000])
    
    



    const onChange = (editorState: any) => {
        // Call toJSON on the EditorState object, which produces a serialization safe string
        const editorStateJSON = editorState.toJSON();
        // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
        setEditorState(JSON.stringify(editorStateJSON));
        // pushUpdates(JSON.stringify(editorStateJSON), 300)
        console.log(editorState);
      }


    return(
        <Editor onChange={onChange}/>
    )
}


export default Editor2;




/*
import { useSearchParams } from "react-router-dom";
import Editor from "./EditFile"
import { useEffect, useState } from "react";
import axios from "axios";

const pushUpdates = ( func: Function, delay: number) => {
    const [data, setData] = useState("");
    const url = import.meta.env.VITE_LINK;
    useEffect(() =>{
        const push = async() =>{
            await axios.post(`${url}/post`)
        }
    }, [delay, func])

}

const Editor2 = () => { 
    
    const [editorState, setEditorState] = useState("");

    
    

    const onChange = (editorState: any) => {
        // Call toJSON on the EditorState object, which produces a serialization safe string
        const editorStateJSON = editorState.toJSON();
        // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
        setEditorState(JSON.stringify(editorStateJSON));
        console.log(editorState);
      }


    return(
        <Editor onChange={onChange}/>
    )
}


export default Editor2;

*/