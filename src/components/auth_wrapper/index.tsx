"use client";

import getProfile from '@/services/auth/profile';
import postRefreshToken from '@/services/auth/refresh_token';
import { Box, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

type props = {
    redirectRouteIfNotAuthenticated: string;
};

function AuthWrapper({ children, redirectRouteIfNotAuthenticated }: PropsWithChildren<props>) {

    const router = useRouter();

    const [accessToken, setAccessToken] = useState(typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null);

    const { data: profile, status, isError, error } = useQuery({
        queryKey: ['getProfile', accessToken || ''],
        queryFn: getProfile,
        retry: 1,
    })

    useEffect(() => {
        if (error instanceof AxiosError) {
            // try refresh token first
            const refreshToken = sessionStorage.getItem('refreshToken');
            if (error.response?.status === 401 && refreshToken) {
                (async () => {
                    const token = await postRefreshToken(refreshToken);
                    sessionStorage.setItem('accessToken', token.accessToken)
                    sessionStorage.setItem('refreshToken', token.refreshToken)
                    // update state and tell react query to refetch
                    setAccessToken(token.accessToken);
                })()

            } else {
                router.replace(redirectRouteIfNotAuthenticated);
            }
        }
    }, [error])

    return (
        <>
            {status === 'pending' ? (
                <Box sx={{
                    py: 4,
                    px: 4
                }} display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'80vh'}>

                    <CircularProgress color='secondary' />
                </Box>
            ) : children}
        </>
    )
}

export default AuthWrapper