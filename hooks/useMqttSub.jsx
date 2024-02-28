import { useContext } from "react";
import { MqttContext } from "./MqttProvider";



const useMqttSub = () => {
    const { client } = useContext(MqttContext);

    const mqttSub = ({ topic, qos = 2 }) => {
        if (client) {

            // subscribe topic
            // https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
            client.subscribe(topic, { qos }, (error) => {
                if (error) {
                    console.log('Subscribe to topics error', error)
                    return
                }
                console.log(`Subscribed to topics: ${topic}`)

            })
        }
    }
    return mqttSub
}

export default useMqttSub