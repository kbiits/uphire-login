"use client";

import AuthWrapper from "@/components/auth_wrapper";

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthWrapper redirectRouteIfNotAuthenticated="/">
            {children}
        </AuthWrapper>
    )
}
