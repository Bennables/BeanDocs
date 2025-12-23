
import { useState, useEffect } from "react";
import axios from "axios";
import VSCodeGUI from "../VSCodeGUI";

export const LexicalParent = () => {

    const [editState, setEditState] = useState("");
    const link = import.meta.env.VITE_BASE_LINK;

    useEffect(()=> {

        const intervalId = setInterval(() => {
            // do stuff
            axios.post(`${link}/`, {editor: editState});
            console.log("HEHE")

        }, 1000);

        return () => clearInterval(intervalId);

    }, [editState])


    const onChange = (editorState: JSON) => {
        console.log(editorState);
        setEditState(JSON.stringify(editorState));

    }

    return <VSCodeGUI onChange={onChange}/>




}


