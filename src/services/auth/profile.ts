import { apiBaseUrl } from "@/app/const";
import axios, { AxiosError } from "axios";
import { QueryFunctionContext } from "@tanstack/react-query";

const endpoint = `${apiBaseUrl}/users/my-details`

async function getProfile({ queryKey, signal }: QueryFunctionContext) {
    const [_, accessToken] = queryKey
    const response = await axios.get(endpoint, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        signal,
    });
    return response.data;
}

export default getProfile;