
import axios from "axios";
import { useEffect,useState} from "react";




const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const link = import.meta.env.VITE_BASE_LINK

    const handleSubmit = () =>{
        console.log(username, password)
        axios.post(`${link}/login`, {username: username, password: password})
        .then((res) => {console.log(res)})
        .catch(e => console.log("There was an error from the login page\n" + e))
    } 


    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-[300px] h-[300px] flex flex-col items-center justify-center border-4 rounded-3xl">
                <h1 className="mb-4">Login</h1>
                <input name="user" placeholder="username" onChange={(e) => {setUsername(e.target.value)}}></input>
                <input className="mt-3" name="password" placeholder="password" onChange={(e) => {setPassword(e.target.value)}}></input>
                <button className="bg-blue-200 my-4 text-gray-500" name="submit" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    )
}
export default LoginPage;