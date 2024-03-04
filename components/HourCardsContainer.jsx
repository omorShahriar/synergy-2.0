'use client'
import HourCard from './HourCard'
import { useEffect, useState } from 'react'

const HourCardsContainer = () => {
    const [socketData, setSocketData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:3002/get-reading-per-five-minutes')
            const { socketData } = await res.json()
            setSocketData(socketData)
        }
        fetchData()
    }, [])


    if (!socketData.length) return (
        <div className="flex justify-center items-center h-96 mt-8">
            <h1>Loading...</h1>
        </div>
    )

    return (
        <div className="mt-8 flex flex-wrap gap-4 justify-center max-w-3xl mx-auto">
            {
                socketData.map((socket, index) => {
                    return <HourCard key={socket.id} id={socket.socketId} data={socket} />
                })

            }

        </div>
    )
}

export default HourCardsContainer