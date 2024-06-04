import axios from "axios";
import { useEffect } from "react"

const Login = ({}) => {
const [email, setEmail] = useEffect("");
const [password, setPassword] = useEffect("");

function getData(e) {
    e.preventDefault();

    let data = {
      email: email,
      password: password
    }

    let config = {
      method: 'post',
      url: 'https://attendence-api-px8b.onrender.com/admin/login',
      data: data,
    }

    axios.request(config)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("auth", response.data.auth);
        setMessage(response.data.message);
  })
      .catch((error) => console.log(error))
  }
  
  return (
    <div>
        <form onSubmit={getData}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Login