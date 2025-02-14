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
  width: number = 64,
  height: number = 128,
  strokeWidth = 1
) {
  switch (type) {
    case "CABRIOLET":
      return (
        <Cabriolet
          stroke={Colors[colorScheme].text}
          strokeWidth={strokeWidth}
          height={height}
          width={width}
        />
      );
    case "COUPE":
      return (
        <Coupe
          strokeWidth={strokeWidth}
          stroke={Colors[colorScheme].text}
          height={height}
          width={width}
        />
      );
    case "GRANDCOUPE":
      return (
        <Grandcoupe
          strokeWidth={strokeWidth}
          stroke={Colors[colorScheme].text}
          height={height}
          width={width}
        />
      );
    case "HATCH":
      return (
        <Hatch
          stroke={Colors[colorScheme].text}
          strokeWidth={strokeWidth}
          height={height}
          width={width}
        />
      );
    case "KOMBI":
      return (
        <Kombi
          strokeWidth={strokeWidth}
          stroke={Colors[colorScheme].text}
          height={height}
          width={width}
        />
      );
    case "PICKUP":
      return (
        <Pickup
          stroke={Colors[colorScheme].text}
          strokeWidth={strokeWidth}
          height={height}
          width={width}
        />
      );
    case "ROADSTER":
      return (
        <Roadster
          stroke={Colors[colorScheme].text}
          strokeWidth={strokeWidth}
          height={height}
          width={width}
        />
      );
    case "SEDAN":
      return (
        <Sedan
          strokeWidth={strokeWidth}
          stroke={Colors[colorScheme].text}
          height={height}
          width={width}
        />
      );
    case "SUV":
      return (
        <Suv
          strokeWidth={strokeWidth}
          stroke={Colors[colorScheme].text}
          height={height}
          width={width}
        />
      );
    default:
      return (
        <Grandcoupe
          strokeWidth={strokeWidth}
          stroke={Colors[colorScheme].text}
          height={height}
          width={width}
        />
      );
  }
}
