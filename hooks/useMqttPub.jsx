import { useContext } from "react";
import { MqttContext } from "./MqttProvider";



const useMqttPub = () => {
    const { client } = useContext(MqttContext);

    const mqttPublish = (payload, topic = "synergy/04", qos = 2) => {
        if (client) {
            // topic, QoS & payload for publishing message
            client.publish(topic, payload, { qos }, (error) => {
                if (error) {
                    console.log('Publish error: ', error)
                }



            })
        }
    }
    return mqttPublish
}

export default useMqttPub