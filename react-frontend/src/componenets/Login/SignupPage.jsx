import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function SignupPage() {
    const [ cookies, setCookie] = useCookies(['user']);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleNameChange(value) {
        setName(value);
    }

    function handleEmailChange(value) {
        setEmail(value);
    }

    function handlePasswordChange(value) {
        setPassword(value);
    }

    function handleLoginChange() {
        return navigate('/login');
    }

    function handleSubmit(e) {
        e.preventDefault();
        const submit = { name, email, password };
        console.log(submit);
        
        const res = fetch('http://localhost:8000/api/register', {
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
    }

    return (
        <div className="modal">
            <h1>Sign Up</h1>
            <form className="userForm" onSubmit={(e)=> handleSubmit(e)}>
                <input
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e)=> handleNameChange(e.target.value)}
                    required
                />
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
            <button className="loginButtons" onClick={handleLoginChange}>
                Have an account? Log in here
            </button>
        </div>
    )
}


export default SignupPage