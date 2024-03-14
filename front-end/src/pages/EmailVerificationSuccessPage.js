import { useHistory } from "react-router-dom";

export const EmailVerificationSuccessPage = () => {
    const history = useHistory();

    return (
        <div className="content-container">
            <h1>Success!</h1>
            <p>Thanx for verifying your email. Now you can use all the app's features</p>
            <button onClick={() => history.push('/')}>Go to home page</button>
        </div>
    );
}