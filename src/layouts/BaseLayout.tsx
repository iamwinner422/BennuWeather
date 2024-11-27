import React from "react";

interface Props {
    children: React.ReactNode
}
export default function BaseLayout({children}: Props){
    return (
        <div className="h-screen bg-background flex items-center justify-center py-10">
            {children}
        </div>
    );
}