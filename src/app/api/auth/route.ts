import { getGoogleUserInfo, postSocialLogin } from "@/services/auth/login";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
    const { provider, access_token } = await req.json()

    if (provider === 'google') {
        const googleUserInfo = await getGoogleUserInfo(access_token);
        try {
            const loginResp = await postSocialLogin({ email: googleUserInfo.email })
            // const loginResp = await postSocialLogin({ email: 'test@uphire.com' })
            return Response.json(loginResp);
        } catch (error) {

            if (error instanceof AxiosError) {
                return Response.json(error.response?.data, {
                    status: error.response?.status,
                })
            }
        }
    }


    return Response.json(null);
}

export { handler as POST };
