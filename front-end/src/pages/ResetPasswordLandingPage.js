import {useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ResetPasswordSuccess } from './ResetPasswordSuccess';
import { ResetPasswordFail } from './ResetPassworkFail';

export const ResetPasswordLandingPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFail, setIsFail] = useState(false);
    const { passwordResetCode } = useParams();

    if (isSuccess) return <ResetPasswordSuccess />;
    if (isFail) return <ResetPasswordFail />;

    const onResetClicked = async () => {
        try{
            await axios.put(`/api/users/${passwordResetCode}/reset-password`, { newPassword: password});
            setIsSuccess(true);
        } catch (e) {
            setIsFail(true);
        }
    }
    return (
        <div className='content-container'>
            <h1>Reset Password</h1>
            <p>Please enter a new   password</p>
            <input 
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Password'
                />
            <input 
                type='password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder='confirm password'
                />
            <button 
                disabled={!password || !confirmPassword || password !== confirmPassword}
                onClick={onResetClicked}
            >Reset</button>
        </div>
    );
}