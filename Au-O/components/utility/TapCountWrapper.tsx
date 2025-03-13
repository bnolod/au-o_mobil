/**
 * Éste componente se encarga de envolver a otro componente y detectar si se ha hecho un tap simple o doble.
 * @module utility/TapCountWrapper
 * @category Utility
 */
import React, { useRef } from 'react';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { TapWrapperProps } from '../ui/props';
/**
 * @property {TapWrapperProps} props
 */
export default function ({ onSingleTap, onDoubleTap, children }: TapWrapperProps) {
  const doubleTapRef = useRef(null);

  return (
    <TapGestureHandler ref={doubleTapRef} onEnded={onDoubleTap} numberOfTaps={2}>
      <TapGestureHandler onEnded={onSingleTap} waitFor={doubleTapRef} numberOfTaps={1}>
        {children}
      </TapGestureHandler>
    </TapGestureHandler>
  );
}
