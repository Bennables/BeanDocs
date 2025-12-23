
import { useState, useEffect } from "react";
import axios from "axios";
import VSCodeGUI from "./components/VSCodeGUI";

export const LexicalParent = () => {

    const [editState, setEditState] = useState("");
    const link = import.meta.env.VITE_BASE_LINK;

    useEffect(() => {
        const timeout = setTimeout(() => {
            axios.post(`${link}/`, { editor: editState });
        }, 1000);

        return () => clearTimeout(timeout);
    }, [editState]);



    const onChange = (editorState: JSON) => {
        console.log(editorState);
        setEditState(JSON.stringify(editorState));

    }

    return <VSCodeGUI onChange={onChange}/>




}


