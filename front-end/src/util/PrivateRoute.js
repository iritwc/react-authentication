import { Redirect, Route } from 'react-router-dom';
import { useUser } from '../auth/useUser';

export const PrivateRoute = props => {
    const user = useUser();

    if (!user) {
        return <Redirect to="/login" ></Redirect>
    } 

    return <Route {...props}></Route>;
}