import Button from "./Button";
import ThemedText from "./ThemedText";

export default function ReactionButton({
  type = "fire", count = 0, onPress, state="inactive"
}: {
  type: "fire" | "heart" | "sunglasses";
    count?: number;
    onPress?: () => void;
    state?: "active" | "inactive"
}) {
  return (
    <Button hapticFeedback="light" onPress={onPress} className={`${state === "active" ? "bg-highlight-light font-black dark:bg-highlight-dark" : ""} bg-backdrop-secondary  dark:bg-backdrop-secondary-dark rounded-xl h-12 p-2`}>
      <ThemedText className="text-xl">
        {type === "fire" && "🔥"}
        {type === "heart" && "😍"}
        {type === "sunglasses" && "😎"}
      </ThemedText>
      <ThemedText className="text-xl">{count > 0 && count}</ThemedText>
    </Button>
  );
}
