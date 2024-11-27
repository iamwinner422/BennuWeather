import React from "react";


export default function BaseLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="h-screen bg-background flex items-center justify-center py-10">
            {children}
        </div>
    );
}