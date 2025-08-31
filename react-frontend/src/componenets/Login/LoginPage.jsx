import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function LoginPage() {
    const [ cookies, setCookie] = useCookies(['user']);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleEmailChange(value) {
        setEmail(value);
    }

    function handlePasswordChange(value) {
        setPassword(value);
    }

    function handleLoginChange() {
        return navigate('/signup');
    }

    function handleSubmit(e) {
        e.preventDefault();
        const submit = { email, password };
        console.log(submit);
        
        const res = fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(submit)
        })
            .then(data => data.json())
            // .then(data => console.log(data))
            .then(setCookie('user', submit))
            .catch(err => console.error(err));
        return
    }

    return (
        <div className="modal">
            <h1>Log In</h1>
            <form className="userForm" onSubmit={(e)=> handleSubmit(e)}>
                <input
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={(e)=> handleEmailChange(e.target.value)}
                    required
                />
                <input
                    placeholder="Password"
                    type="text"
                    value={password}
                    onChange={(e)=> handlePasswordChange(e.target.value)}
                    required
                />
                <button className="submit" type="submit">
                    Submit
                </button>
            </form>
            <button className="loginButtons" onClick={()=> handleLoginChange()}>
                No Account? Sign Up Here
            </button>
        </div>
    )
}


export default LoginPage