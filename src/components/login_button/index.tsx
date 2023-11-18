import { grayTextColor } from '@/app/const';
import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { LiteralUnion } from 'react-hook-form';

type Props = {
    bgColor: string;
    imgComponent: React.JSX.Element,
    buttonText: string;
    buttonTextColor: string;
    withBorder?: boolean;
    onClick?: React.MouseEventHandler<any>;
}

function LoginButton({ bgColor, imgComponent, buttonText, buttonTextColor, withBorder, onClick }: Props) {
    return (
        <Box onClick={onClick}>
            <Grid container alignItems='center' sx={{
                backgroundColor: bgColor,
                borderRadius: 7,
                padding: .5,
                cursor: 'pointer',
                ...(withBorder ? {
                    border: `1px solid ${grayTextColor}`,
                } : {}),
            }}>
                <Grid item xs={1} width={'100%'} height={'100%'}>
                    <Box sx={{
                        background: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '32px',
                        width: '32px',
                        borderRadius: '50%',
                    }}>
                        {imgComponent}
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <Box>
                        <Typography textAlign={'center'} variant='body1' color={buttonTextColor}>
                            {buttonText}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default LoginButton