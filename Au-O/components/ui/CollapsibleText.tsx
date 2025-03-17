/**
 * Összecsukható szöveg komponens
 * @module ui/CollapsibleText
 * @category Component
 */
import { useState } from 'react';
import ThemedText from './ThemedText';
import { handleShowMore } from '@/lib/events';
import * as Haptics from 'expo-haptics';
import {CollapsibleTextProps} from './props';
/**
 * 
 * @param {CollapsibleTextProps} props Tulajdonságok
 * @returns 
 */
export default function CollapsibleText({
  restrictedLineCount = 3,
  children,
  className,
  TextProps,
}: CollapsibleTextProps) {
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
