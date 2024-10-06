'use client';

import { Divider } from "antd";
import AccelerationMonitor from "./AccelerationMonitor";
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import StatisticMonitor from "./StatisticMonitor";

interface ISocketValues {
    timestamp?: Date;
    velocity?: number;
}

export default function RealTimePanel() {
    const [socketValues, setSocketValues] = useState<ISocketValues | null>(null);
    const [velocity, setVelocity] = useState<number>(0);
    const [smashFactor, setSmashFactor] = useState<number>(1.1);

    useEffect(() => {
        // Create Socket.io client instance
        const socket = io('http://localhost:6996');

        socket.on('connect', () => {
            console.log('Connected to Socket.io server');
        });

        // Listen for new data from the server
        socket.on('newData', (data: string) => {
            console.log(`Raw data received: ${data}`);

            try {
                const parsedData: ISocketValues = JSON.parse(data); // Parse the incoming data
                setVelocity(parsedData.velocity || 0); // Update the velocity
            } catch (error) {
                console.error('Failed to parse data:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from Socket.io server');
        });

        // Clean up on unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="mx-40 my-10 py-6 px-8 rounded-xl border-2 border-green-800 shadow-xl bg-gray-200">
            <div className="font-bold text-2xl text-green-800">Real - Time Performance</div>
            <Divider className="m-0 mt-2 border-green-800 border-[1px]" />

                <div className="flex flex-row justify-center mt-6">
                    
                    {/* Power Bar Monitoring */}
                    <AccelerationMonitor velocity={velocity || 0} />

                    {/* Other Values */}
                    <div>
                        <StatisticMonitor title={'Ball Speed'} value={velocity * smashFactor} unit="mph" />
                        <StatisticMonitor title={'Total Distance'} value={47.55} unit="ft"/>
                    </div>

                    <div>
                        <StatisticMonitor title={'Roll Distance'} value={17.55} unit="ft"/>
                        <StatisticMonitor title={'Carry Distance'} value={30.00} unit="ft"/>
                    </div>

                </div>
        </div>
    );
}
