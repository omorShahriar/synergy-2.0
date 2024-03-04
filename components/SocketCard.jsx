'use client'
import { Switch, cn } from "@nextui-org/react";
import { useState, useEffect, useContext } from "react";
import { MqttContext } from "@/hooks/MqttProvider";
import useMqttPub from "@/hooks/useMqttPub";
import useMqttSub from "@/hooks/useMqttSub";


const SwitchSelector = ({ id }) => {
    const [isSelected1, setIsSelected1] = useState(0);
    const [isSelected2, setIsSelected2] = useState(0);
    const [isSelected3, setIsSelected3] = useState(0);
    const { client } = useContext(MqttContext)
    const publish = useMqttPub();

    useEffect(() => {
        if (client) {
            client.on('message', (topic, message) => {
                const channel = topic.toString();
                if (channel === 'synergy/button/one') {
                    const value = parseInt(message.toString());
                    setIsSelected1(!value);
                }
                if (channel === 'synergy/button/two') {
                    const value = parseInt(message.toString());
                    setIsSelected2(!value);
                }
                if (channel === 'synergy/button/three') {
                    const value = parseInt(message.toString());
                    setIsSelected3(!value);
                }

            })
        }
    }, [client])
    if (id == 1) {
        return <Switch color="success" isSelected={isSelected1} onValueChange={(value) => {
            publish(value ? '0' : '1', 'synergy/button/one');
            setIsSelected1(value)
        }} />
    }
    if (id == 2) {
        return <Switch color="success" isSelected={isSelected2} onValueChange={(value) => {
            publish(value ? '0' : '1', 'synergy/button/two');
            setIsSelected2(value)
        }} />
    }
    if (id == 3) {
        return <Switch color="success" isSelected={isSelected3} onValueChange={(value) => {
            publish(value ? '0' : '1', 'synergy/button/three');
            setIsSelected3(value)
        }} />
    }







}
const ChoosePower = ({ id, reading }) => {

    if (id === 1) {
        return <p className="flex justify-between">
            <span className="text-[#7BB601]">  Power: </span>
            <span className="inline-block ml-2">
                {
                    reading.power1
                }
                W</span>

        </p>

    }
    if (id === 2) {
        return <p className="flex justify-between">
            <span className="text-[#7BB601]">  Power: </span>
            <span className="inline-block ml-2">{
                reading.power2
            }
                W</span>

        </p>
    }
    if (id === 3) {
        return
    }


}
const ChooseCurrent = ({ id, reading }) => {

    let crnt = 0;
    if (id === 1) {
        crnt = reading.crnt1
    }
    if (id === 2) {
        crnt = reading.crnt2
    }
    if (id === 3) {
        crnt = reading.crnt3
    }
    return <p className="flex justify-between">
        <span className="text-[#7BB601]">  Current: </span>
        <span className="inline-block ml-2">{
            crnt
        }
            A</span>

    </p>
}
const SocketCard = ({ title, id }) => {

    const [reading, setReading] = useState({ voltage: 0, power1: 0, power2: 0, power3: 0, crnt1: 0, crnt2: 0, crnt3: 0 });
    const { client } = useContext(MqttContext)


    const subscribe = useMqttSub();

    useEffect(() => {
        if (client) {
            subscribe({ topic: 'synergy/button/#' });
            subscribe({ topic: 'synergy/value' });
        }
    }, [client, subscribe])
    useEffect(() => {
        if (client) {
            client.on('message', (topic, message) => {
                const channel = topic.toString();

                if (channel === 'synergy/value') {
                    const { voltage, power1, power2, power3, crnt1, crnt2, crnt3 } = JSON.parse(message.toString());
                    setReading({
                        voltage: voltage.toFixed(3),
                        power1: power1.toFixed(3),
                        power2: power2.toFixed(3),
                        power3: power3.toFixed(3),
                        crnt1: crnt1.toFixed(3),
                        crnt2: crnt2.toFixed(3),
                        crnt3: crnt3.toFixed(3)

                    });

                }
            })
        }
    }, [client])
    return (
        <div className="bg-white p-4 rounded-lg basis-4/12">
            <p className="text-center text-xl font-bold">
                {title}
            </p>
            <div className="flex flex-col gap-y-2 items-center mt-8">
                <div className="flex items-center justify-between gap-2 max-w-fit">
                    <p>Off</p>
                    <SwitchSelector id={id} />
                    <p className="-ml-2">On</p>
                </div>
                <div className="mt-4 flex flex-col gap-y-2">
                    <p className="flex justify-between">
                        <span className="text-[#7BB601]">  Current: </span>
                        <span className="inline-block ml-2">{
                            id == 1 ? reading.crnt1 : id == 2 ? reading.crnt2 : reading.crnt3
                        }
                            A</span>

                    </p>
                    <p className="flex justify-between">
                        <span className="text-[#7BB601]">  Voltage: </span>
                        <span className="inline-block ml-2">{reading.voltage}V</span>

                    </p>
                    <p className="flex justify-between">
                        <span className="text-[#7BB601]">  Power: </span>
                        <span className="inline-block ml-2">{
                            id == 1 ? reading.power1 : id == 2 ? reading.power2 : reading.power3
                        }
                            W</span>

                    </p>
                </div>

            </div>
        </div>
    )
}

export default SocketCard