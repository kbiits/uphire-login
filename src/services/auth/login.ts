import { apiBaseUrl } from "@/app/const";
import encrypt from "@/utils/encrypt";
import axios from "axios";
import crypto from 'node:crypto'

type loginData = {
    email: string;
    password?: string;
}

const endpoint = `${apiBaseUrl}/sessions`
const endpointSocial = `${apiBaseUrl}/sessions/social-login`
const encKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY

async function postLogin({ email, password }: loginData) {
    email = encrypt(email, encKey!)
    password = encrypt(password!, encKey!)
    const response = await axios.post(endpoint, {
        email,
        password,
    });

    return response.data;
}

export async function postSocialLogin({ email }: loginData) {
    email = encrypt(email, encKey!)
    const response = await axios.post(endpointSocial, {
        email,
    }, {
        headers: {
            'X-API-KEY': process.env.API_KEY,
        }
    });

    return response.data;
}

export async function getGoogleUserInfo(accessToken: string) {
    const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer ' + accessToken } },
    );

    return userInfo.data;
}

export async function postGoogleLogin(accessToken: string) {
    const tokenResp = await axios.post(
        '/api/auth',
        {
            provider: 'google',
            access_token: accessToken,
        },
    );

    return tokenResp.data;
}

export default postLogin;