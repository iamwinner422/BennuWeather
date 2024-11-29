import Title from "../components/Title.tsx";
import FrameLayout from "../layouts/FrameLayout.tsx";
import BaseLayout from "../layouts/BaseLayout.tsx";
import {Link} from "react-router-dom";


interface Props {
    isNight: boolean;
}
export default function NextSevenDays({isNight = false}: Props){
    return(
        <BaseLayout>
            <FrameLayout isNight={isNight}>
                <Title isNight={isNight}/>
                <div className="my-5 px-4 flex flex-col gap-y-4">
                    <Link to="/">
                        <i className="bi bi-chevron-left font-bold text-app "></i>
                    </Link>
                    <h2 className="text-appBackground font-medium">Next <span className="font-bold">4 days</span></h2>
                    <div className="bg-white shadow-xl rounded px-4 py-6 flex flex-col gap-y-5">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-x-4 items-center">
                                <h5 className="text-sm text-appBackground font-bold">Monday</h5>
                                <i className="wi wi-cloud text-swatch_1"></i>
                            </div>
                            <div className="flex gap-x-2 items-center">
                                <span className="text-appBackground text-sm font-bold">26°C</span>
                                <span className="text-gray-400 text-xs">19°C</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <div className="w-full flex space-x-10">
                                <div className="flex w-1/2">
                                    <div className="w-full flex justify-between items-center">
                                        <span style={{fontSize: "12px"}}
                                            className="font-bold text-appBackground">Wind</span>
                                        <span style={{fontSize: "10px"}} className="text-gray-400">12 m/h</span>
                                    </div>
                                </div>
                                <div className="flex w-1/2">
                                    <div className="w-full flex justify-between items-center">
                                        <span style={{fontSize: "12px"}}
                                            className="font-bold text-appBackground">Humidity</span>
                                        <span style={{fontSize: "10px"}} className="text-gray-400">55%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex space-x-10">
                                <div className="flex w-1/2">
                                    <div className="w-full flex justify-between items-center">
                                        <span style={{fontSize: "12px"}}
                                            className="font-bold text-appBackground">Visibility</span>
                                        <span style={{fontSize: "10px"}} className="text-gray-400">25 km</span>
                                    </div>
                                </div>
                                <div className="flex w-1/2">
                                    <div className="w-full flex justify-between items-center">
                                        <span style={{fontSize: "12px"}}
                                            className="font-bold text-appBackground">UV</span>
                                        <span style={{fontSize: "10px"}} className="text-gray-400">1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FrameLayout>
        </BaseLayout>
    )
}