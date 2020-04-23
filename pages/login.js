import {useState} from 'react'
import Layout from '../components/Layout';
import axios from 'axios';

function Login(props) {

    const login=(e)=>{
        e.preventDefault()
        console.log("Login")
        console.log(props)
        //window.location.href="/"
        axios.post('/login', {username, password})
                .then(res=>{
                    console.log("Successful Login")
                    window.location.href="/"
                })
                .catch(err=>{
                    alert("Invalid Credentials")
                })
        

    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    return (
        <div>
            <Layout>
                <form onSubmit={login} method="POST">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="Submit">Login</button>
                </form>
            </Layout>
        </div>
    )
}

export default Login
