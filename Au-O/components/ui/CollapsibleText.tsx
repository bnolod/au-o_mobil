import { ReactNode, useState } from "react";
import ThemedText from "./ThemedText";
import { handleShowMore } from "@/lib/events";
import { TextProps } from "react-native";
import * as Haptics from "expo-haptics";
export default function CollapsibleText({
  restrictedLineCount = 3,
  children,
  className,
  TextProps,
}: {
  restrictedLineCount?: number;
  children: ReactNode;
  className?: string;
  TextProps?: TextProps;
}) {
  const [lines, setLines] = useState<number | undefined>(restrictedLineCount);
  return (
    <ThemedText
      {...TextProps}
      onPressIn={
        TextProps?.onPressIn
          ? TextProps.onPressIn
          : () => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
      }
      numberOfLines={lines}
      onPress={() => setLines(handleShowMore(lines, restrictedLineCount))}
      className={className}
    >
      {children}
    </ThemedText>
  );
}
