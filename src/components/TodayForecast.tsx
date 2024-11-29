import {Swiper, SwiperSlide} from "swiper/react";
import ForecastDetail from "./ForecastDetail.tsx";

export default function TodayForecast(){
    return (
        <div className="w-full">
            <Swiper className="motion-preset-slide-left"
                style={{paddingTop: '25px'}}
                slidesPerView={5} // Nombre de slides visibles en même temps
                spaceBetween={10} // Espace entre les slides
                slidesOffsetBefore={20} // Espace à gauche du slider
                slidesOffsetAfter={20} // Espace à droite du slider
            >
                {Array.from({length: 10}).map((_, index) => (
                    <SwiperSlide
                        key={index}
                        className="bg-white/20 hover:bg-white border border-opacity-30 cursor-pointer
                                    border-white rounded-full py-2.5 h-auto flex flex-col justify-center items-center text-center
                                    transition-all delay-0 duration-700 ease-out [translate:0] hover:[translate:0_-18px]
                                    group hover:shadow-2xl shadow-white
                                    "
                    >
                        <ForecastDetail/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}