import React from "react";

interface Props {
    children: React.ReactNode;
    isNight: boolean;
}

export default function FrameLayout({children, isNight}: Props){
    return (
        <div className={`w-full sm:w-1/4 h-full sm:border-4 sm:rounded-3xl relative ${isNight ? 'bg-appBackground': 'bg-swatch_3'}`}>
            {children}
        </div>
    )
}