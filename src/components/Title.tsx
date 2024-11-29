

interface Props {
    isNight: boolean;
}

export default function Title({isNight}: Props) {
    return (
        <div className="flex justify-center items-center w-full pt-6 relative">
            <div className="absolute left-4">
                <button>
                    <i className={`bi bi-filter-left font-bold text-xl ${isNight ? 'text-white': 'text-appBackground'}`}></i>
                </button>
            </div>
            <h1 className={`text-xs font-bold ${isNight ? 'text-white' : 'text-appBackground'}`}>Weather Forecast</h1>
        </div>
    )
}