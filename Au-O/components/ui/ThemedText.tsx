import { ReactNode } from "react";
import { Text, TextProps } from "react-native";

interface Props extends TextProps {
  children?: ReactNode;
  className?: string;
  color?: string;
}

export function ThemedText({
  children,
  className,
  color,
  ...props
}: Props) {
  return (
    <Text
      {...props}
      className={`${className} ${
        color ? `text-${color}` : "dark:text-background"
      }
      ${/*className?.includes("font-") ? "" : ""*/""} `}
    >
      {children}
    </Text>
  );
}
export default ThemedText