interface Props {
    maxTemp: number;
}

export default function ProgressBar ({ maxTemp }: Props){
    const progressEnd = (20 / maxTemp) * 100; //ratio
    return (
        <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="float-end bg-red-500 h-4 rounded-full" style={{ width: `${Math.floor(progressEnd)}%` }}></div>
        </div>
    );
};

