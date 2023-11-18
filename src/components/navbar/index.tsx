"use client";

import { ChevronRight, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Button, Container, Grid, Link, Menu, MenuItem, MenuList, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import style from './style.module.css';
import { primaryTextColor, secondaryTextColor } from "@/app/const";

const links = [
    {
        key: 1,
        content: "About UPHIRE",
        href: "/about-uphire",
    },
    {
        key: 2,
        content: "How it works",
        href: "/about-uphire",
        withDropdown: true,
        items: [
            {
                content: "How to find a job",
            },
            {
                content: "How to hire",
            },
        ]
    },
    {
        key: 3,
        content: "Jobs",
        href: "/jobs",
    },
    {
        key: 4,
        content: "Projects",
        href: "/projects",
    }
]

export default function Navbar() {
    const buttonMenuDropdownRef = React.useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenMenuDropdown = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setIsOpen((prev) => !prev);
    }, [])

    return (
        <>
            <Box sx={{
                boxShadow: '0px 12px 20px rgba(30, 30, 30, 0.08);',
            }}>
                <Container maxWidth="xl">
                    <Grid container height='93px' direction={'row'}>
                        <Grid container item md={8} lg={8} xl={8} direction={'row'} display={'flex'}>
                            <Stack gap={10} direction={'row'}>
                                <Stack justifyContent={'center'} direction={'column'}>
                                    <Link href="/" underline="always">
                                        <Image priority alt="Uphire Logo" src={"/logo.svg"} height={22} width={98} />
                                    </Link>
                                </Stack>
                                <Stack direction={'row'} gap={'30px'}>
                                    {links.map(linkData => (
                                        linkData.withDropdown ? (
                                            <Box key={linkData.key}>
                                                <Button
                                                    ref={buttonMenuDropdownRef}
                                                    id={"button-" + linkData.key.toString()}
                                                    aria-controls={isOpen ? linkData.key.toString() : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={isOpen ? 'true' : undefined}
                                                    variant="text"
                                                    color={"primary"}
                                                    size="medium"
                                                    disableRipple
                                                    onClick={handleOpenMenuDropdown}
                                                    endIcon={!isOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                                                    sx={{
                                                        height: '100%',
                                                        textDecoration: 'none',
                                                        textTransform: 'none',
                                                        fontSize: 16,
                                                        fontWeight: 400,
                                                        // letterSpacing: '10px',
                                                        ":hover": {
                                                            backgroundColor: "inherit"
                                                        }
                                                    }}
                                                    disableFocusRipple
                                                    disableTouchRipple
                                                >
                                                    {linkData.content}
                                                </Button>
                                                <Paper>
                                                    <Menu anchorEl={buttonMenuDropdownRef.current} onClose={() => setIsOpen(false)} open={isOpen} id={linkData.key.toString()}>
                                                        {linkData.items.map((item) => (
                                                            <MenuItem key={item.content} sx={{
                                                                height: '56px',
                                                            }}>
                                                                <Box color={secondaryTextColor} display={"flex"} justifyContent={'space-between'} width={"100%"}>
                                                                    <Typography variant="body1">
                                                                        {item.content}
                                                                    </Typography>
                                                                    <ChevronRight />
                                                                </Box>

                                                            </MenuItem>
                                                        ))}
                                                    </Menu>
                                                </Paper>
                                            </Box>
                                        ) :
                                            <Link key={linkData.key} className={style.nav_link} align={'center'} href={linkData.href}>
                                                {linkData.content}
                                            </Link>
                                    ))}
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid container item md={4} lg={4} xl={4} direction={'row'} justifyContent={'right'}>
                            <Stack sx={{
                                fontSize: '16px',
                            }} gap={5} display={'flex'} direction={'row'} alignItems={'center'}>
                                <Link href="/" sx={{
                                    textDecoration: 'none',
                                }}>
                                    Login
                                </Link>
                                <Button href="/sign-up" size="large" color="secondary" sx={{
                                    textTransform: 'none',
                                    px: 4
                                }} variant="outlined">Sign up</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box >
        </>
    )

}
// <Grid container height={93} justifyContent="space-between">
//     <Grid item xs={8}>
//         <Stack direction={"row"}>
//             <Stack>

//                 <div>
//                     <Image width={98} height="22" alt="Uphire Logo" src="/logo.svg" />
//                 </div>
//             </Stack>
//             <Stack spacing={2} direction='row' alignItems='center'>
//                 {links.map((linkData) => (
//                     <Link color="#414141" href={linkData.href} underline="always">
//                         {linkData.content}
//                     </Link>
//                 ))}
//             </Stack>
//         </Stack>
//     </Grid>
//     <Grid item xs={4}>
//         <div>
//             <Image width={98} height="22" alt="Uphire Logo" src="/logo.svg" />
//         </div>
//         {/* <Grid xs={4}>
//             <Grid item xs={6}>
//                 <Link>
//                     <NextLink href="/" />
//                 </Link>
//             </Grid>
//             <Grid item xs={6}>

//             </Grid>
//         </Grid> */}
//     </Grid>
// </Grid>