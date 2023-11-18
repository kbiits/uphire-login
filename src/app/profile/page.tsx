"use client";

import getProfile from '@/services/auth/profile';
import { Alert, Box, CircularProgress, Snackbar, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

function Profile() {

    const search = useSearchParams();

    const [snackbar, setSnackbar] = useState(search.get('login') === 'success' ? {
        type: 'success',
        message: 'Login success',
    } : null);

    const accessToken = typeof window !== 'undefined' ? (sessionStorage.getItem('accessToken') || '') : '';

    const { data: profile, status } = useQuery({
        queryKey: ['getProfile', accessToken],
        queryFn: getProfile,
        retry: 1,
    })

    if (profile) {
        console.log('profile', profile);
    }

    const closeSnackbar = useCallback(() => {
        setSnackbar(null);
    }, [])

    return status === 'pending' ? (
        <Box sx={{
            py: 4,
            px: 4
        }} display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'80vh'}>

            <CircularProgress color='secondary' />
        </Box>
    ) : (
        <section>
            <Snackbar open={!!snackbar} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity={snackbar?.type as any} sx={{ width: '100%' }}>
                    {snackbar?.message}
                </Alert>
            </Snackbar>

            <Box sx={{
                py: 4,
                px: 4,
            }} minHeight={'70vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <Typography variant='h5' textAlign={'center'}>
                    Hi, {profile?.name}
                </Typography>
            </Box>
        </section>
    )
}

export default Profile