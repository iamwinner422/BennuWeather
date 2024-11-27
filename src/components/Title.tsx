export default function Title() {
    return (
        <div className="flex justify-center items-center w-full py-6 relative">
            <div className="absolute left-4">
                <i className="bi bi-filter-left font-bold text-xl text-white"></i>
            </div>
            <span className="text-xs font-bold text-white">Weather Forecast</span>
        </div>
    )
}