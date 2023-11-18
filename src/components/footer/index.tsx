import { grayTextColor } from '@/app/const'
import { Box, Button, Container, Divider, FormControl, Grid, IconButton, Link, Stack, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const socialLinks = [
    {
        href: "https://facebook.com",
        iconUrl: "/facebook.svg",
        alt: "Our Facebook",
    },
    {
        href: "https://instagram.com",
        iconUrl: "/instagram.svg",
        alt: "Our Instagram",
    },
    {
        href: "https://linkedin.com",
        iconUrl: "/linkedin.svg",
        alt: "Our Linkedin",
    },
    {
        href: "https://twitter.com",
        iconUrl: "/twitter.svg",
        alt: "Our Twitter",
    }
]

const footerLinks = [
    {
        header: "First Column",
        items: [
            {
                text: "First page",
                href: "/first-page",
            },
            {
                text: "Second page",
                href: "/second-page",
            },
            {
                text: "Third page",
                href: "/third-page",
            },
            {
                text: "Fourth page",
                href: "/fourth-page",
            },
            {
                text: "Fifth page",
                href: "/fifth-page",
            },
        ]
    },
    {
        header: "Second Column",
        items: [
            {
                text: "Sixth page",
                href: "/sixth-page",
            },
            {
                text: "Seventh page",
                href: "/seventh-page",
            },
            {
                text: "Eighth page",
                href: "/eighth-page",
            },
        ]
    },
    {
        header: "Third Column",
        items: [
            {
                text: "Ninth page",
                href: "/ninth-page",
            },
            {
                text: "Tenth page",
                href: "/tenth-page",
            },
            {
                text: "Eleventh page",
                href: "/eleventh-page",
            },
            {
                text: "Twelth page",
                href: "/twelth-page",
            },
        ]
    },
]

function Footer() {
    return (
        <Box sx={{
            borderTop: `1px solid #D5D6D8`,
            pt: 6,
            pb: 2,
        }}>
            <Container maxWidth="xl">
                <Stack direction={'column'} gap={4}>
                    <Grid container direction='row'>
                        <Grid item xs={12} lg={2}>
                            <Link href="/" underline="always">
                                <Image priority alt="Uphire Logo" src={"/logo.svg"} height={22} width={98} />
                            </Link>
                        </Grid>
                        <Grid container direction={'row'} item xs={12} lg={7}>
                            {
                                footerLinks.map((footerData) => (
                                    <Grid key={footerData.header} item xs={12} sm={4}>
                                        <Stack>
                                            <Typography marginBottom={2} fontSize={20}>{footerData.header}</Typography>
                                            {footerData.items.map((footerItem) => (
                                                <Link key={footerItem.href} href={footerItem.href} color={grayTextColor} fontSize={16} sx={{
                                                    textDecoration: 'none',
                                                    mb: 1,
                                                }}>{footerItem.text}</Link>
                                            ))}
                                        </Stack>
                                    </Grid>

                                ))
                            }
                        </Grid>
                        <Grid item xs={12} lg={3} display={'flex'} justifyContent={'end'}>
                            <Stack>
                                <Typography marginBottom={2} fontSize={20}>Subscribe</Typography>
                                <FormControl>
                                    <TextField sx={{
                                        mb: 2,
                                    }} size='small' variant='outlined' color='secondary' placeholder='Enter email'></TextField>
                                    <Button sx={{
                                        textTransform: 'none',
                                    }} variant='contained' color='secondary'>Send</Button>
                                </FormControl>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid container direction={'row'} sx={{
                        borderTop: `0.75px solid #D5D6D8`,
                        pt: 3,
                    }}>
                        <Grid item xs={3} alignItems={'center'} display={'flex'}>
                            <Typography fontSize={14} color={grayTextColor}>© UPHIRE. 2022</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Stack direction={'row'} gap={3} alignItems={'center'} justifyContent={'end'}>
                                <Typography color={grayTextColor} fontSize={14}>Follow Us</Typography>
                                {socialLinks.map(link => (
                                    <IconButton key={link.href} target='_blank' href={link.href} sx={{
                                        borderRadius: '50%',
                                        border: `.5px solid #414141`,
                                    }}>
                                        <Image width={14} height={14} alt={link.alt} src={link.iconUrl} />
                                    </IconButton>
                                ))}
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </Container>
        </Box>
    )
}

export default Footer