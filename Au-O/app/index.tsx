import { ThemedText } from "@/components/ui/ThemedText";
import { Redirect } from "expo-router";

export default function Home() {
    const signedIn = false;
    if (signedIn) {
        return <Redirect href="/" />;
    }
    else return <Redirect href="/onboarding" />;
}