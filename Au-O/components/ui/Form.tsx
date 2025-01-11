import { Keyboard, TouchableWithoutFeedback } from "react-native";

export default function Form({ children }: { children: React.ReactNode }) {

   return (
        <TouchableWithoutFeedback className="flex px-4 justify-center items-center" onPress={Keyboard.dismiss}>
            {children}
        </TouchableWithoutFeedback>
    )
}
