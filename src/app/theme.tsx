import { createTheme } from "@mui/material";
import { primaryTextColor } from "./const";
import { forwardRef } from "react";
import NextLink from "next/link";

const LinkBehaviour = forwardRef<HTMLAnchorElement, any>(function LinkBehaviour(props, ref) {
    return <NextLink ref={ref} {...props} />;
});


export default createTheme({
    palette: {
        primary: {
            main: primaryTextColor,
        },
        secondary: {
            main: "#fe5506",
        },
        background: {
            default: 'white',
        },
    },
    typography: {
        fontFamily: `var(--font-inter), Inter, sans-serif`,
        allVariants: {
            color: primaryTextColor,
            letterSpacing: '.2px',
        }
    },

    components: {
        MuiLink: {
            defaultProps: {
                component: LinkBehaviour,
            }
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehaviour
            }
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 768,
            lg: 1024,
            xl: 1280,

            // common in other frameworks
            // xs: 0,
            // sm: 640,
            // md: 768,
            // lg: 1024,
            // xl: 1280,

            // default mui
            //   xs: 0,
            //   sm: 600,
            //   md: 900,
            //   lg: 1200,
            //   xl: 1536,
        }
    }
})
