import { logInRoute } from './logInRoute';
import { signUpRoute } from './signUpRoute';
import { testRoute } from './testRoute';
import { updateUserInfoRoute } from './updateUserInfoRoute';
import { verifyEmailRoute } from './verifyEmailRoute';
import { forgotPasswordRoute } from './forgotPasswordRoute';
import { resetPasswordRoute } from './resetPasswordRoute';
import { getGoogleOAuthUrlRoute } from './getGoogleOAuthUrlRoute';
import { googleOauthCallBackRoute } from './googleOauthCallbackRoute';

export const routes = [
    testRoute,
    signUpRoute,
    logInRoute,
    updateUserInfoRoute,
    getGoogleOAuthUrlRoute,
    verifyEmailRoute,
    forgotPasswordRoute,
    resetPasswordRoute,
    getGoogleOAuthUrlRoute,
    googleOauthCallBackRoute
];
