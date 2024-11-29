
interface Props {
    formattedDate: string
}

export default function CurrentWeather({formattedDate}: Props){
    return (
        <div className="my-5">
            <div className="flex items-center gap-4 justify-center">
                <div>
                    <i className="wi wi-cloud text-swatch_1"></i>
                </div>
                <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-white">Today</h3>
                    <span style={{fontSize: "9px"}} className="text-white">{formattedDate}</span>
                </div>
            </div>
            <div className="flex flex-col gap-y-3 items-center justify-center">
                <div className="flex mt-5">
                    <h2 className="text-white text-7xl">28</h2>
                    <span className="text-white text-lg">°C</span>
                </div>
                <span className="text-white text-xs">Lomé</span>
                <span className="text-white text-xs">Fill Like 32 • Sunset</span>
            </div>
        </div>
    )
}