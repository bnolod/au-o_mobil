import Button from "./Button";
import ThemedText from "./ThemedText";

export default function ReactionButton({
  type = "fire", count = 0, onPress,
}: {
  type: "fire" | "heart" | "sunglasses";
    count?: number;
    onPress?: () => void;
}) {
  return (
    <Button onPress={onPress} className="bg-backdrop-secondary dark:bg-backdrop-secondary-dark rounded-xl h-12 p-2">
      <ThemedText className="text-xl">
        {type === "fire" && "🔥"}
        {type === "heart" && "😍"}
        {type === "sunglasses" && "😎"}
      </ThemedText>
      <ThemedText className="text-xl">{count > 0 && count}</ThemedText>
    </Button>
  );
}
