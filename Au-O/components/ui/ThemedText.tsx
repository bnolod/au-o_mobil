import { ReactNode } from 'react';
import { Text } from 'react-native';
import { ThemedTextProps } from './props';


export function ThemedText({ children, className, color, ...props }: ThemedTextProps) {
  return (
    <Text
      {...props}
      className={`${className} ${color ? `text-${color}` : 'dark:text-background'}
      ${/*className?.includes("font-") ? "" : ""*/ ''} `}
    >
      {children}
    </Text>
  );
}
export default ThemedText;
