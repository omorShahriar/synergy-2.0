"use client"
import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import mqtt from 'mqtt';

export const MqttContext = createContext();

export const MqttProvider = ({ children }) => {
    const [client, setClient] = useState(null)
    const [connectStatus, setConnectStatus] = useState('Connect')

    const mqttConnect = (host, mqttOption) => {
        setConnectStatus('Connecting');
        setClient(mqtt.connect(host, mqttOption));
    };

    useEffect(() => {
        const connectUrl = "wss://broker.emqx.io:8084/mqtt"
        const options = {
            clientId: 'emqx_react_' + Math.random().toString(16).substring(2, 8),
            clean: true,
            reconnectPeriod: 1000, // ms
            connectTimeout: 30 * 1000, // ms
        }
        mqttConnect(connectUrl, options)
    }, [])

    useEffect(() => {
        if (client) {
            client.on('connect', () => {
                setConnectStatus('Connected');
            });
            client.on('error', (err) => {
                console.error('Connection error: ', err);
                client.end();
            });
            client.on('reconnect', () => {
                setConnectStatus('Reconnecting');
            });
        }
    }, [client]);

    return (
        <MqttContext.Provider value={{ client, connectStatus }}>
            {children}
        </MqttContext.Provider>
    );
};

MqttProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
