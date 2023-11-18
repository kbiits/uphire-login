import { grayTextColor } from "@/app/const";
import postLogin from "@/services/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { AxiosError } from "axios";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import FormInputText from "./FormInputText";
import { loginResponse } from "@/app/page";
import { useRouter } from "next/navigation";

const LoginSchema = z.object({
    email_or_uname: z.string({ required_error: 'Email or Username is required' }).min(1, 'Email or Username is required'),
    password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
})

type LoginSchemaType = z.infer<typeof LoginSchema>

const mapBackendMessageToCustomMessage: Record<string, string> = {
    "User not found": "Email or Username is not exists",
    "Credentials incorrect": "Wrong password"
}

export default function LoginForm() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const { handleSubmit, control, getValues } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) })
    const router = useRouter();

    const doLogin = useMutation({
        mutationFn: postLogin,
        onSuccess: (loginResp: loginResponse) => {
            sessionStorage.setItem('accessToken', loginResp.accessToken)
            sessionStorage.setItem('refreshToken', loginResp.refreshToken)
            router.push('/profile?login=success');
        }
    })

    const onSubmitHandler = useCallback(() => {
        doLogin.mutate({ email: getValues('email_or_uname'), password: getValues('password') })
    }, [getValues])

    const errorMessage = useMemo(() => {
        if (!doLogin.isError) return '';

        const messageFromBackend = ((doLogin.error as AxiosError).response?.data as any).message;
        return mapBackendMessageToCustomMessage[messageFromBackend] || 'Email or Username is not exists';
    }, [doLogin.error])

    return (
        <form method="POST" onSubmit={handleSubmit(onSubmitHandler)}>
            <Stack direction='column' gap={3} paddingBottom={4}>
                <FormInputText type="text" name="email_or_uname" placeholder="Email / Username" color='secondary' inputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <Image width='20' height='20' alt='login-icon' src='/profile-icon.svg' />
                        </InputAdornment>
                    )
                }} control={control} />

                <FormInputText
                    type={passwordVisible ? 'text' : 'password'}
                    name="password" placeholder="Password"
                    color='secondary'
                    control={control}
                    inputProps={{
                        endAdornment: (
                            <InputAdornment sx={{
                                ml: 1,
                            }} position='end'>
                                <IconButton size="medium" onClick={() => setPasswordVisible(prev => !prev)}>
                                    {
                                        passwordVisible ?
                                            <Visibility /> :
                                            <VisibilityOff />
                                    }
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                {doLogin.isError && <Typography color={'error'} variant="subtitle2">{errorMessage}</Typography>}
            </Stack>
            <Box sx={{
                paddingBottom: 2,
            }}>
                <FormControlLabel control={<Checkbox color={'secondary'} />} label={
                    <Typography variant="body1" color={grayTextColor}>
                        Remember Me
                    </Typography>
                } />
            </Box>
            <Box>
                <Button type="submit" variant="contained" color="secondary" size="large" sx={{
                    textTransform: 'none',
                    fontWeight: '500',
                }} fullWidth>
                    Continue with Email
                    <Box pl={3} display={'flex'} alignItems={'center'}>
                        {doLogin.isPending && <CircularProgress size={20} sx={{
                            color: 'white',
                        }} />}
                    </Box>
                </Button>
            </Box>
        </form>
    )
}