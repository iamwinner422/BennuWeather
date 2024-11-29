import {Link} from "react-router-dom";


interface Props {
    
}


export default function ButtonSection(){
    return (
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
    )
}