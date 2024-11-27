import BaseLayout from "../layouts/BaseLayout.tsx";

export default function Home() {
    return (
        <BaseLayout>
            <div className="w-1/4 h-full border-4 rounded-3xl">
                <div className="flex justify-center items-center w-full py-4 relative">
                    <div className="absolute left-4">
                        <i className="bi bi-filter-left"></i>
                    </div>
                    <span className="text-sm font-bold">Weather Forecast</span>
                </div>
            </div>
        </BaseLayout>
    )
}