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
import { CarType } from "@/constants/types";

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
  type: CarType,
  colorScheme: "light" | "dark" = "dark",
  size: number = 64,
  height?: number
) {
  switch (type) {
    case "CABRIOLET":
      return (
        <Cabriolet
          stroke={Colors[colorScheme].text}
          height={height || size}
          width={size}
        />
      );
    case "COUPE":
      return (
        <Coupe
          stroke={Colors[colorScheme].text}
          height={height || size}
          width={size}
        />
      );
    case "GRANDCOUPE":
      return (
        <Grandcoupe
          stroke={Colors[colorScheme].text}
          height={height || size}
          width={size}
        />
      );
    case "HATCH":
      return (
        <Hatch
          stroke={Colors[colorScheme].text}
          height={height || size}
          width={size}
        />
      );
    case "KOMBI":
      return (
        <Kombi
          stroke={Colors[colorScheme].text}
          height={height || size}
          width={size}
        />
      );
    case "PICKUP":
      return (
        <Pickup
          stroke={Colors[colorScheme].text}
          height={height || size}
          width={size}
        />
      );
    case "ROADSTER":
      return (
        <Roadster
          stroke={Colors[colorScheme].text}
          height={height || size}
          width={size}
        />
      );
    case "SEDAN":
      return (
        <Sedan
          stroke={Colors[colorScheme].text}
          height={height || size}
          width={size}
        />
      );
    case "SUV":
      return <Suv stroke={Colors[colorScheme].text} height={height || size} />;
    default:
      return (
        <Grandcoupe stroke={Colors[colorScheme].text} height={height || size} />
      );
  }
}
