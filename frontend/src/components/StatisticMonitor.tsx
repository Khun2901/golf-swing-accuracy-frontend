import { Divider } from "antd";

type StatisticMonitorProps = {
    title: string,
    value: number | string,
    unit: string
}

export default function StatisticMonitor(props: StatisticMonitorProps) {
    return (
        <div className="block w-[250px] m-4 py-4 px-6 rounded-md shadow-xl shadow-lg bg-gray-100">
            <div className="font-bold text-md text-green-800">{props.title}</div>
            <Divider className="m-0 mt-2 border-green-800" />
            <div className="text-center pt-4 text-2xl">{props.value} {props.unit}</div>
        </div>
    )
}