import {Link} from "react-router-dom";
import React from "react";


interface Props {
    forecastSection: "today" | "tomorrow";
    setForecastSection: React.Dispatch<React.SetStateAction<"today" | "tomorrow">>;
    isNight: boolean;
}


export default function ButtonSection({forecastSection, setForecastSection, isNight}: Props){
    return (
        <div className="px-10 flex items-baseline justify-between">
            <button onClick={()=>setForecastSection("today")} className="${isNight ? 'text-white': 'text-appBackground'} font-semibold text-sm flex flex-col items-center gap-y-1">
                Today
                {forecastSection === "today" && <div className={`motion-preset-slide-left ${isNight ? 'bg-white': 'bg-appBackground'} rounded-full h-1.5 w-1.5`}></div>}
            </button>
            <button onClick={()=>setForecastSection("tomorrow")} className="${isNight ? 'text-white': 'text-appBackground'} font-semibold text-sm flex flex-col items-center gap-y-1">
                Tomorrow
                {forecastSection === "tomorrow" && <div className={`motion-preset-slide-left ${isNight ? 'bg-white' : 'bg-appBackground'} rounded-full h-1.5 w-1.5`}></div>}
            </button>
            <Link to="/next-four-days"
                className="text-swatch_1 font-semibold text-sm flex items-center justify-center">
                Next 4 Days
                <i className="bi bi-chevron-right text-xs"></i>
            </Link>
        </div>
    )
}