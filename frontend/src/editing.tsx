import { useSearchParams } from "react-router-dom";
import Editor from "./EditFile"
import { useEffect, useState } from "react";
import axios from "axios";
// import { defineConfig, loadEnv } from 'vite';


const Editor2 = ( props : any) => { 

    const [editorState, setEditorState] = useState("");
    const url = import.meta.env.VITE_BASE_LINK;



    useEffect(() => {
        const retrievePage = async() =>{
            axios.get(`${url}/${props.id}`)
            .then(res => {
                console.log(res)
            })
            .catch(
                err=> {
                    console.log(err);
            })

        }
        retrievePage();

    }, [])
    

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

        // this is the cleanup. it runs immediately before useEffect is run again
        // ends the process even if it doesn't get to execute, so you must not make changes for 3000ms before it saves
        return () => clearInterval(intervalId);

    }, [editorState])

    useEffect(() => { 
        const pull = async() => {
            console.log("retrieving data");
            const updatedData = await axios.get(`${url}/${props.id}`)
            .then(res => {
                console.log(res);


            })
            .catch(err => {
                console.log(err)
            })
        }

        const intervalId = setInterval(pull, 3000);

        return() => clearInterval(intervalId);
    })
    
    



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