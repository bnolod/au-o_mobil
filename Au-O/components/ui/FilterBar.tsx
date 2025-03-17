/**
 * Szűrő sáv
 * @module ui/FilterBar
 * @category Component
 */
import { TextInput } from 'react-native';
import {FilterBarProps} from './props'
/**
 * @param {FilterBarProps} props Tulajdonságok
 */
export default function FilterBar({ onChange, className, placeholder, initialValue }: FilterBarProps) {
  return (
    <TextInput
      onChange={(e) => onChange(e.nativeEvent.text)}
      placeholder={placeholder}
      className={` px-2 dark:text-white text-lg w-11/12 mx-auto rounded-xl h-12  leading-none align-middle secondary mb-4 ${className}`}
    />
  );
}
