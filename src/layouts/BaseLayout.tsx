import React from "react";

interface Props {
    children: React.ReactNode
}
export default function BaseLayout({children}: Props){
    return (
        <div className="h-screen bg-background">
            {children}
        </div>
    );
}