"use client";

import LoginButton from '@/components/login_button';
import LoginForm from '@/components/login_form';
import { Alert, Box, Container, Divider, Grid, Link, Snackbar, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { grayTextColor } from './const';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { getGoogleUserInfo, postGoogleLogin, postSocialLogin } from '@/services/auth/login';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type loginResponse = {
  accessToken: string;
  refreshToken: string;
}

export default function Login() {

  // const { data: sessionData, status } = useSession();
  const router = useRouter();

  const [snackBar, setSnackBar] = useState<AxiosError | null>(null);

  useEffect(() => {
    return () => { }
  }, [])

  const googleLoginMutation = useMutation({
    mutationKey: ['googleLogin'],
    mutationFn: postGoogleLogin,
    onSuccess: (loginResp: loginResponse) => {
      sessionStorage.setItem('accessToken', loginResp.accessToken)
      sessionStorage.setItem('refreshToken', loginResp.refreshToken)
      router.push('/profile?login=success');
    },
  });

  const googleLogin = useGoogleLogin({
    onSuccess: (token) => googleLoginMutation.mutate(token.access_token),
    flow: 'implicit',
    prompt: 'consent',
  });

  useEffect(() => {
    if (googleLoginMutation.isError) {
      setSnackBar(googleLoginMutation.error as AxiosError)
    }

    return () => { }
  }, [googleLoginMutation.isError])

  const closeSnackbar = useCallback(() => {
    setSnackBar(null);
  }, [])



  return (
    <section>
      <Snackbar open={!!snackBar} autoHideDuration={6000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="error" sx={{ width: '100%' }}>
          Failed login. {(snackBar?.response?.data as any)?.message || ''}
        </Alert>
      </Snackbar>

      <Box sx={{
        py: 8,
      }}>
        <Container maxWidth="xl">
          <Box width={"100%"} display={"flex"} justifyContent={"center"}>
            <Box sx={{
              border: '1px solid #d5d6d8',
              borderRadius: 2,
              maxWidth: '530px',
              width: "100%",
              paddingX: 6,
              paddingTop: 4,
              paddingBottom: 6,
            }}>
              <Box textAlign={'center'}>
                <Typography variant='h4' fontSize={36} fontWeight={'bold'}>Login to Uphire</Typography>
              </Box>
              <Stack direction={'column'} gap={2} paddingTop={5}>
                <LoginButton onClick={() => {
                  googleLogin();
                }} bgColor='#017bfe' buttonText='Continue with Google' buttonTextColor='white' imgComponent={
                  <Image width={'14'} height={'18'} alt='Google login' src={"/google-login-icon.svg"} />
                } />
                <LoginButton withBorder bgColor='white' buttonText='Continue with Apple' buttonTextColor={grayTextColor} imgComponent={
                  <Image width={'14'} height={'18'} alt='Apple login' src={'/apple-login-icon.svg'} />
                } />
              </Stack>
              <Grid container py={4} direction={'row'} alignItems={'center'} columns={13}>
                <Grid item xs={6}>
                  <Divider />
                </Grid>
                <Grid item xs={1}>
                  <Typography color={grayTextColor} textAlign={'center'}>or</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Divider />
                </Grid>
              </Grid>
              <Box sx={{
                paddingBottom: 4,
              }}>
                <LoginForm />
              </Box>
              <Stack gap={1} direction={'row'} justifyContent={'center'}>
                <Typography color={grayTextColor}>Don&apos;t have account?</Typography>
                <Link color={'secondary'} href='/sign-up' sx={{
                  textDecoration: 'none',
                }}>Sign up</Link>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>
    </section>
  )
}
