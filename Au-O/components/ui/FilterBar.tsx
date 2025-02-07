import { TextInput } from "react-native";
import Input from "./Input";
import { FilterBarProps } from "@/constants/types";

export default function FilterBar({
  onChange,
  placeholder,
  initialValue,
}: FilterBarProps) {
  return (
    <TextInput
      placeholder={placeholder}
      className=" px-2 dark:text-white text-lg w-11/12 mx-auto rounded-xl h-12  leading-none align-middle secondary mb-4"
    />
  );
}
