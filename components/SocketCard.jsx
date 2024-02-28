'use client'
import { Switch, cn } from "@nextui-org/react";
import { useState, useEffect, useContext } from "react";
import { MqttContext } from "@/hooks/MqttProvider";
import useMqttPub from "@/hooks/useMqttPub";
import useMqttSub from "@/hooks/useMqttSub";
const SocketCard = ({ title }) => {
    const [isSelected, setIsSelected] = useState(0);
    const { client } = useContext(MqttContext)

    const publish = useMqttPub();
    const subscribe = useMqttSub();
    useEffect(() => {
        if (client) {
            subscribe({ topic: 'synergy/button/#' })
        }
    }, [client, subscribe])
    useEffect(() => {
        if (client) {
            client.on('message', (topic, message) => {
                const channel = topic.toString();
                if (channel === 'synergy/button/one') {
                    const value = parseInt(message.toString());
                    setIsSelected(!value);
                }
            })
        }
    }, [isSelected, client])
    return (
        <div className="bg-white p-4 rounded-lg basis-4/12">
            <p className="text-center text-xl font-bold">
                {title}
            </p>
            <div className="flex flex-col gap-y-2 items-center mt-8">
                <div className="flex items-center justify-between gap-2 max-w-fit">
                    <p>Off</p>
                    <Switch color="success" isSelected={isSelected} onValueChange={(value) => {
                        publish(value ? '0' : '1', 'synergy/button/one');
                        setIsSelected(value)
                    }} />

                    <p className="-ml-2">On</p>
                </div>
                <div className="mt-4 flex flex-col gap-y-2">
                    <p className="flex justify-between" >
                        <span className="text-[#7BB601]">  Current: </span>
                        <span className="inline-block ml-2">20W</span>

                    </p>
                    <p className="flex justify-between">
                        <span className="text-[#7BB601]">  Voltage: </span>
                        <span className="inline-block ml-2">20W</span>

                    </p>
                    <p className="flex justify-between">
                        <span className="text-[#7BB601]">  Power: </span>
                        <span className="inline-block ml-2">20W</span>

                    </p>
                </div>

            </div>
        </div>
    )
}

export default SocketCard