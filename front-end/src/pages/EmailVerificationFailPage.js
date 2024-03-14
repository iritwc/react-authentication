import { useHistory } from "react-router-dom";

export const EmailVerificationFailPage = () => {
    const history = useHistory();

    return (
        <div className="content-container">
            <h1>Uh oh...</h1>
            <p>Something went wrong while verifying your email</p>
            <button onClick={() => history.push('/Signup')}>Back to sign-up</button>
        </div>
    );
}