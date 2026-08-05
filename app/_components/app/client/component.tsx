"use client"

import { SessionProvider } from "next-auth/react";
import React from "react";



type ClientSideProps = {
    children: React.ReactNode;
}


export function ClientSide({ children }: ClientSideProps) {
    return (
        <SessionProvider>
            {
                children
            }
        </SessionProvider>
    )
}