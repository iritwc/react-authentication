import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const history = useHistory();

    const onSendClicked = async () => {
        try {
            await axios.put(`/api/forgot-password/${email}`);
            setSuccess(true);
            setTimeout(() => {
                history.push('/login')
            }, 3000);
        } catch (e) {
            setError(e.message);
        }
    }

    return success ? (
        <div className='content-container'>
            <h1>Success</h1>
            <p>Check your email for a reset link</p>
        </div>
    ) : (
        <div className='content-container'>
            <h1>Forgot password</h1>
            <p>Enter and email and we'll send you a reset link</p>
            { error && <div className='fail'>{error}</div>}
            <input 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='example@gmail.com'

            />
            <button 
                disabled={!email}
                onClick={onSendClicked}>Send </button>
        </div>
    )
}


