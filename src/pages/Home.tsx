import BaseLayout from "../layouts/BaseLayout.tsx";
import FrameLayout from "../layouts/FrameLayout.tsx";
import Title from "../components/Title.tsx";
import moment from "moment";
import {WeatherData} from "../lib/types.ts";
import {Link} from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';

const todayDate = new Date();
const formattedDate: string = moment(todayDate).format("ddd, D MMM");


interface Props {
    isFetching: boolean;
    currentWeatherData: WeatherData | null;
}

export default function Home({isFetching}: Props) {
    return (
        <BaseLayout>
            <FrameLayout>
                <Title/>
                <div className="my-6">
                    <div className="flex items-center gap-4 justify-center">
                        <div>
                            {isFetching ?
                                <span className="text-swatch_1 font-bold">--</span> :
                                <i className="wi wi-night-sleet text-swatch_1"></i>
                            }
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
                        <span className="text-white text-xs">Ville</span>
                        <span className="text-white text-xs">Fill Like ° Sunset</span>
                    </div>
                </div>
                <div className="">
                    <div className="px-10 flex items-baseline justify-between">
                        <button className="text-white font-semibold text-sm flex flex-col items-center gap-y-1">
                            Today
                            <div className="bg-white rounded-full h-1.5 w-1.5"></div>
                        </button>
                        <button className="text-white font-semibold text-sm">Tomorrow</button>
                        <Link to="/next-seven-days"
                            className="text-swatch_1 font-semibold text-sm flex items-center justify-center">
                            Next 7 Days
                            <i className="bi bi-chevron-right text-xs"></i>
                        </Link>
                    </div>
                    <div className="w-full">
                        <Swiper
                            className="mt-8 mx-4"
                            slidesPerView={5} // Nombre de slides visibles en même temps
                            spaceBetween={10} // Espace entre les slides
                            slidesOffsetBefore={20} // Espace à gauche du slider
                            slidesOffsetAfter={20} // Espace à droite du slider
                        >
                            {Array.from({ length: 10 }).map((_, index) => (
                                <SwiperSlide
                                    key={index}
                                    className="bg-white/20 border border-opacity-30 cursor-pointer border-white rounded-full py-4 h-auto flex flex-col items-center"
                                >
                                    <span>12AM</span>
                                    <div className="bg-appBackground h-7 w-7 rounded-full flex items-center justify-center">
                                        <i className="wi wi-sunset text-white"></i>
                                    </div>
                                    <div className="flex">
                                        29 <span className="text-xs">°C</span>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                </div>
            </FrameLayout>
        </BaseLayout>
    )
}