import { TapWrapperProps } from '@/constants/types';
import React, { useRef } from 'react';
import { TapGestureHandler } from 'react-native-gesture-handler';

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
