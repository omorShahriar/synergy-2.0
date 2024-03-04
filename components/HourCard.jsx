import Image from 'next/image'
import moment from 'moment-timezone'
const HourCard = ({ id = 1, data }) => {

    const startTime = moment(data.startHour).tz('Asia/Dhaka').format("HH:mm A");
    const endTime = moment(data.endHour).tz('Asia/Dhaka').format("HH:mm A");
    const power = (data.power / 1000).toFixed(3);

    return (
        <div className="flex-grow-[45%] grid grid-cols-12 rounded-md max-w-md bg-white">
            <div className="col-span-4 bg-[#7BB601] flex items-center justify-center rounded-md">
                <Image src="/plug-white.png" width={40} height={40} />
            </div>
            <div className="col-span-8 flex flex-col p-4 gap-y-2">
                <h3 className="mb-2">Socket {id}</h3>
                <p>{startTime} to {endTime}</p>
                <p> <span>Power:</span> {power} KW </p>
            </div>
        </div>
    )
}

export default HourCard