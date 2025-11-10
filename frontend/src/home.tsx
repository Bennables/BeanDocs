import { useEffect, useState } from "react"
import axios from "axios";


const Home = () => {
    const link: string = import.meta.env.VITE_LINK

    const [doc, setDoc] = useState(1);

    const handleSubmit = async () => {
        console.log(`We're trying to open doc number ${doc}`)

        const res = await axios.get(`http://localhost:5001/${doc}`)
        .catch(e => {
            console.log(e)
        })
        console.log(res)

    }



    return(
        <>
            <select defaultValue= '1' name='docid' id='docid' onChange={(e) => setDoc(+(e.target.value))}>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
            </select>
            <button onClick={handleSubmit}>Open Doc</button>
            
        </>
    )
}

export default Home;