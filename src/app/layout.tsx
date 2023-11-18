"use client";

import { CssBaseline, ThemeProvider } from '@mui/material';
import { Inter } from 'next/font/google';
import theme from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
        <title>Uphire - Login</title>
        <meta name="description" content="Login to uphire" />
      </head>
      <body className={inter.variable}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />

          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
            <CssBaseline />
            <ThemeProvider theme={theme}>
              <Navbar />
              {children}
              <Footer />
            </ThemeProvider>
          </GoogleOAuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
