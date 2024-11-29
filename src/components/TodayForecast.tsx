import {Swiper, SwiperSlide} from "swiper/react";
import ForecastDetail from "./ForecastDetail.tsx";
import {WeatherData} from "../lib/types.ts";

interface Props {
    forecast: Array<WeatherData>;
}

export default function TodayForecast({forecast}: Props){
    return (
        <div className="w-full motion-preset-slide-left">
            <Swiper
                style={{paddingTop: '25px'}}
                slidesPerView={5} // Nombre de slides visibles en même temps
                spaceBetween={10} // Espace entre les slides
                slidesOffsetBefore={20} // Espace à gauche du slider
                slidesOffsetAfter={20} // Espace à droite du slider
            >
                {forecast.map((data, index) => (
                    <SwiperSlide
                        key={index}
                        className="bg-white/20 hover:bg-white border border-opacity-30 cursor-pointer
                                    border-white rounded-full py-2.5 h-auto flex flex-col justify-center items-center text-center
                                    transition delay-150 ease-in-out duration-300 [translate:0] hover:[translate:0_-18px] hover:motion-preset-fade
                                    group hover:shadow-2xl shadow-white
                                    "
                    >
                        <ForecastDetail data={data}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}