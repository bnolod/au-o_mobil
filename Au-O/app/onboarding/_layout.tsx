import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function OnboardingLayout() {
    return (
        <>
              <StatusBar style="auto" />
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}} />
            
        </Stack>
        </>
    )
}