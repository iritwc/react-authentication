import {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import axios from 'axios';
import { useQueryParams } from '../util/useQueryParams';

export const LogInPage = () => {
    const [, setToken] = useToken();
    const [errorMessage, setErrorMessage ] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [googleOuthUrl, setGoogleOauthUrl] = useState(null);

    const history = useHistory();
    const { token : oAuthToken } = useQueryParams();

    useEffect(()=> {
        if (oAuthToken) {
            setToken(oAuthToken);
            history.push('/');
        }
    }, [oAuthToken, setToken, history]);

    useEffect(() => {
        async function fetchGoogleUrl() {
            try{
                const response = await axios.get('auth/google/url');
                const {url} = response.data;
                setGoogleOauthUrl(url);
            } catch (err) {
                console.log(err);
            }
        }
        fetchGoogleUrl();
    }, []);

    const onLogInClicked = async () => {
        try {
            const response = await axios.post('/api/login', {email, password});
            const {token} = response.data;
            setToken(token);
            history.push('/');
        } catch (e) {
            console.log(e);
            setErrorMessage(e.message)
        }
    }
    return (
        <div className="content-container">
            <h1>Log In</h1>
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
            <button onClick={onLogInClicked} disabled={!email || !password}>Log In</button>
            <button className='link-button' onClick={() => history.push('/forgot-password')}> Forgot your password?</button>
            <button className='link-button' onClick={() => history.push('/signup')} >Not registred ? Sign up</button>
            <hr />
            <button disabled={!googleOuthUrl} onClick={() => window.location.href=googleOuthUrl}>Sign up with Google</button>
        </div>
    );
}