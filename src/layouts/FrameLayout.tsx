import React from "react";

export default function FrameLayout({children}: {children: React.ReactNode}){
    return (
        <div className="w-1/4 h-full border-4 rounded-3xl bg-appBackground">
            {children}
        </div>
    )
}