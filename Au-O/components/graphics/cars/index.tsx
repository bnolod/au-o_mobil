import { Colors } from "@/constants/Colors";
import Cabriolet from "./Cabriolet";
import Coupe from "./Coupe";
import Grandcoupe from "./Grandcoupe";
import Hatch from "./Hatch";
import Kombi from "./Kombi";
import Pickup from "./Pickup";
import Roadster from "./Roadster";
import Sedan from "./Sedan";
import Suv from "./Suv";

export { default as Cabriolet } from "./Cabriolet";
export { default as Coupe } from "./Coupe";
export { default as Grandcoupe } from "./Grandcoupe";
export { default as Hatch } from "./Hatch";
export { default as Kombi } from "./Kombi";
export { default as Pickup } from "./Pickup";
export { default as Roadster } from "./Roadster";
export { default as Sedan } from "./Sedan";
export { default as Suv } from "./Suv";

export function getCarImage(
  type: string,
  colorScheme: "light" | "dark" = "dark",
  size: number = 64
) {
  switch (type) {
    case "Cabriolet":
      return <Cabriolet stroke={Colors[colorScheme].text} height={size} width={size} />;
    case "Coupe":
      return <Coupe stroke={Colors[colorScheme].text} height={size} width={size}/>;
    case "Grandcoupe":
      return <Grandcoupe stroke={Colors[colorScheme].text} height={size} width={size}/>;
    case "Hatch":
      return <Hatch stroke={Colors[colorScheme].text} height={size} width={size} />;
    case "Kombi":
      return <Kombi stroke={Colors[colorScheme].text} height={size} width={size} />;
    case "Pickup":
      return <Pickup stroke={Colors[colorScheme].text} height={size} width={size} />;
    case "Roadster":
      return <Roadster stroke={Colors[colorScheme].text} height={size} width={size} />;
    case "Sedan":
      return <Sedan stroke={Colors[colorScheme].text} height={size} width={size} />;
    case "Suv":
      return <Suv stroke={Colors[colorScheme].text} height={size} />;
    default:
      return <Grandcoupe stroke={Colors[colorScheme].text} height={size} />;
  }
}
