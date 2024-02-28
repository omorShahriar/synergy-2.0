'use client'

import SocketCard from "@/components/SocketCard";
import { MqttContext } from "@/hooks/MqttProvider";
import useMqttPub from "@/hooks/useMqttPub";
import useMqttSub from "@/hooks/useMqttSub";
import { useContext, useEffect, useState } from "react";


export default function Home() {
  const [message, setMessage] = useState(null)
  const [topic, setTopic] = useState(null)
  const [buttonOne, setButtonOne] = useState(0)
  const { client } = useContext(MqttContext)

  const publish = useMqttPub();
  const subscribe = useMqttSub();
  useEffect(() => {
    if (client) {
      subscribe({ topic: 'synergy/#' })
    }
  }, [client, subscribe])

  useEffect(() => {
    if (client) {
      client.on('message', (topic, message) => {

        setMessage(message.toString())
        setTopic(topic.toString())
      })
    }
  }, [client])
  useEffect(() => {
    if (topic === 'synergy/button/one') {

    }
  }, [buttonOne])
  const toggleButton = () => {
    publish(buttonOne ? '0' : '1', 'synergy/button/one');
    setButtonOne(!buttonOne)
  }
  return (
    <>
      <div className="mt-32">
        <div className="flex  gap-2 items-center max-w-2xl mx-auto">
          <SocketCard title="Socket 1" />
          {/* <SocketCard title="Socket 2" />
          <SocketCard title="Socket 3" /> */}
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex gap-4 items-center"><p>Message</p>
          <p>{message}</p></div>

        <div className="flex gap-4 items-center"><p>Topic</p>
          <p>{topic}</p></div>

      </div>
      <div className="mt-6">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={toggleButton}>Toggle Button</button>
      </div>

    </>
  );
}
