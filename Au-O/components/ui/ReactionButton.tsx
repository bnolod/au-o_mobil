import { formatNumber } from '@/lib/functions';
import Button from './Button';
import ThemedText from './ThemedText';
import { ReactionButtonProps } from '@/constants/types';

export default function ReactionButton({
  type = 'FIRE',
  count = 0,
  onPress,
  state = 'inactive',
  initialReactionState,
}: ReactionButtonProps) {
  const disabled = initialReactionState !== null && initialReactionState !== type;
  return (
    <Button
      disabled={disabled}
      hapticFeedback="light"
      onPress={onPress}
      className={`${state === 'active' ? 'bg-highlight-light font-black dark:bg-highlight-dark' : ''} ${
        disabled && 'pointer-events-none opacity-25'
      } ${initialReactionState === type} bg-backdrop-secondary  dark:bg-backdrop-secondary-dark rounded-xl h-12 p-2`}
    >
      <ThemedText className="text-xl">
        {type === 'FIRE' && '🔥'}
        {type === 'HEART' && '😍'}
        {type === 'COOL' && '😎'}
      </ThemedText>
      <ThemedText className="text-xl">{count > 0 && formatNumber(count)}</ThemedText>
    </Button>
  );
}
