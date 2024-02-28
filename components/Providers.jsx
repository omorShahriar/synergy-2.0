// app/providers.tsx
'use client'

import { NextUIProvider } from '@nextui-org/react'
import { MqttProvider } from '@/hooks/MqttProvider.jsx';
export function Providers({ children }) {
    return (
        <>
            <MqttProvider>
                <NextUIProvider>
                    {children}
                </NextUIProvider>
            </MqttProvider>
        </>

    )
}