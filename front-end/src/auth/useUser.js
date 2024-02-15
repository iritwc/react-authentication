import { useState, useEffect } from "react";
import { useToken } from "./useToken";


export const useUser = () => {

    const [token] = useToken();

    const getPayload = token => {
        const encodedPayload = token.split('.')[1];
        console.log(encodedPayload, token);
        return JSON.parse(atob(encodedPayload));
    }

    const [user, setUser] = useState(() => {
        console.log('in use state', token);
        if (!token) {
            return null;
        }

        return getPayload(token);
    });

    useEffect(() => {
        if (!token) {
            setUser(null);
        } else {
            setUser(getPayload(token));
        }
    }, [token]);

    return user;
}