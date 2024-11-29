import React from "react";

export default function FrameLayout({children}: {children: React.ReactNode}){
    return (
        <div className="w-full sm:w-1/4 h-full border-4 rounded-3xl bg-appBackground relative">
            {children}
        </div>
    )
}