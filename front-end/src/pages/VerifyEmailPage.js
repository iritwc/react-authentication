import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const VerifyEmailPage = () => {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => history.push('/'), 3000);
  }, [history]);

  return (
    <div className="content-container">
      <h1>Thanx for Signing Up!</h1>
      <p>
        A verfication email was sent to the email address provided. 
        Please verfiy your email to unlock full features.
      </p>
    </div>
  );
}

