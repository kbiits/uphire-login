import { apiBaseUrl } from "@/app/const";
import axios from "axios";

const endpoint = `${apiBaseUrl}/sessions/refresh-token`;

export async function postRefreshToken(refreshToken: string) {
    const tokenResp = await axios.post(
        endpoint,
        {
            refreshToken: refreshToken,
        },
    );

    return tokenResp.data;
}

export default postRefreshToken;