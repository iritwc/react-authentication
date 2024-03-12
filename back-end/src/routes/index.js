import { getGoogleOAuthUrlRoute } from './getGoogleOAuthUrlRoute';
import { logInRoute } from './logInRoute';
import { signUpRoute } from './signUpRoute';
import { testRoute } from './testRoute';
import { updateUserInfoRoute } from './updateUserInfoRoute';

export const routes = [
    testRoute,
    signUpRoute,
    logInRoute,
    updateUserInfoRoute,
    getGoogleOAuthUrlRoute
];
