import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import axios from 'axios';

export const SignUpPage = () => {
    const [, setToken] = useToken();
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const history = useHistory();

    const onSignUpClicked = async () => {
        try {
            const response = await axios.post('/api/signup', {email, password});
            console.log('on click', response)
            const {token} = response.data;
            setToken(token);
            history.push('/');
        } catch (err) {
            console.log('signup page: ', err);
        }
       
    }
    return (
        <div className="content-container">
            <h1>Sign Up</h1>
            {errorMessage && <div className='fail'>{errorMessage}</div>}
            <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="someone@email.com" />
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password" />
            <input 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="password" />
            <hr />
            <button 
                onClick={onSignUpClicked} 
                disabled={!email || !password || password !== confirmPassword} 
            >Save</button>
            <button onClick={() => history.push('/login')} >Already have an account ? Log In</button>
        </div>
    );
}