import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../auth/useUser';
import { useToken } from '../auth/useToken';
import { useMessage } from '../util/useMessages';

export const UserInfoPage = () => {
    // We'll use the history to navigate the user
    // programmatically later on (we're not using it yet)
    const history = useHistory();

    const user = useUser();
    const [token, setToken] = useToken();

    const {id, email, info} = user;

    const [successMessage, setSuccessMessage] = useMessage();
    const [errorMessage, setErrorMessage] = useMessage();

    // These states are bound to the values of the text inputs
    // on the page (see JSX below). 
    const [favoriteFood, setFavoriteFood] = useState(info.favoriteFood || '');
    const [hairColor, setHairColor] = useState(info.hairColor || '');
    const [bio, setBio] = useState(info.bio || '');

    const saveChanges = async () => {
        try {
            const response = await axios.put(`/api/users/${id}`, {
                favoriteFood,
                hairColor,
                bio
            }, {
                headers: { Authorization: `Bearer ${token}`}
            });

            const {token: newToken} = response.data;
            setToken(newToken);
            setSuccessMessage(true);

        } catch(err) {
            console.log(err);
            setErrorMessage(true);
        }
    }

    const logOut = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }
    
    const resetValues = () => {
        console.log(info)
       setFavoriteFood(info.favoriteFood);
       setHairColor(info.hairColor);
       setBio(info.bio);
    }
    
    // And here we have the JSX for our component. It's pretty straightforward
    return (
        <div className="content-container">
            <h1>Info for {email}</h1>
            {successMessage && <div className="success">Successfully saved user data!</div>}
            {errorMessage && <div className="fail">Uh oh... something went wrong and we couldn't save changes</div>}
            <label>
                Favorite Food:
                <input
                    onChange={e => setFavoriteFood(e.target.value)}
                    value={favoriteFood} />
            </label>
            <label>
                Hair Color:
                <input
                    onChange={e => setHairColor(e.target.value)}
                    value={hairColor} />
            </label>
            <label>
                Bio:
                <input
                    onChange={e => setBio(e.target.value)}
                    value={bio} />
            </label>
            <hr />
            <button onClick={saveChanges}>Save Changes</button>
            <button onClick={resetValues}>Reset Values</button>
            <button onClick={logOut}>Log Out</button>
        </div>
    );
}