import {Bar} from "react-chartjs-2";
// @ts-ignore
import {_DeepPartialObject} from "chart.js/dist/types/utils";
import {CoreChartOptions} from "chart.js";


interface DataType {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderRadius: number;
        barThickness: number;
        borderSkipped: boolean;
    }[]
}
interface Props {
    data: DataType;
    options: _DeepPartialObject<CoreChartOptions<"bar">>;
    isNight: boolean;
}

export default function ChanceOfRain({data, options, isNight }: Props){
    return (
        <div className="px-6 flex flex-col gap-y-4">
            <h4 className={`font-bold ${isNight ? 'text-white' : 'text-appBackground'}`}>Chance of rain</h4>
            <div className="flex w-full">
                <Bar data={data} options={options}/>;
            </div>
        </div>
    )
}