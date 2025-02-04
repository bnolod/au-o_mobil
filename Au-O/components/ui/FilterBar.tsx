import { TextInput } from "react-native";
import Input from "./Input";

export default function FilterBar({onChange, placeholder, initialValue}: {onChange: (value: string) => void, placeholder?: string, initialValue?: string}) {
    return (
        <TextInput placeholder={placeholder} className=" px-2 dark:text-white text-lg w-11/12 mx-auto rounded-xl h-12  leading-none align-middle secondary mb-4" />
    )
}