/**
 * API hívást intéző gomb, ami válaszra vár és közben letiltja a gombot, opcionális késleltetéssel
 * @module ui/ApiCallButton
 * @category Component
 */
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useState } from 'react';
/**
 * @property {TouchableOpacityProps} props Tulajdonságok
 * @property {number} delay Késleltetés
 * @property {() => Promise<void>} apiCall API hívás
 */
export default function ApiCallButton({
  apiCall,
  delay,
  ...props
}: TouchableOpacityProps & { delay?: number; apiCall: () => Promise<void> }) {
  const [waiting, setWaiting] = useState<boolean>(false);
  return (
    <TouchableOpacity
      className={props.className}
      style={props.style}
      disabled={waiting}
      onPress={async () => {
        if (waiting) return;
        setWaiting(true);
        try {
          await apiCall();
        } finally {
          delay
            ? setTimeout(() => {
                setWaiting(false);
              }, delay)
            : setWaiting(false);
        }
      }}
      {...props}
    >
      {props.children}
    </TouchableOpacity>
  );
}
