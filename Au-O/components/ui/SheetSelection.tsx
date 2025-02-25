import { BottomSheetFlashList, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, ReactNode, useImperativeHandle, useRef, useState } from 'react';
import Button from './Button';
import { BottomSheetFlashListProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/BottomSheetFlashList';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ThemedText from './ThemedText';
import { Keyboard, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { CommonStaticElementProps } from '@/constants/types';
import FilterBar from './FilterBar';

export interface SheetSelectionRef {
  dismissSheet: () => void;
}

const SheetSelection = forwardRef<
  SheetSelectionRef,
  {
    FlashListProps: BottomSheetFlashListProps<any>;
    placeholder?: string | ReactNode;
  } & CommonStaticElementProps
>(({ FlashListProps, language, colorScheme, placeholder }, ref) => {
  const [sheetState, setSheetState] = useState(false);
  const sheet = useRef<BottomSheetModal>(null);
  const toggleSheet = () => {
    if (sheetState) {
      sheet.current?.dismiss();
    } else {
      sheet.current?.present();
      sheet.current?.snapToIndex(1);
    }
    setSheetState(!sheetState);
  };
  const dismissSheet = () => {
    sheet.current?.dismiss();
    sheet.current?.dismiss();
    Keyboard.removeAllListeners('keyboardWillShow');
    Keyboard.removeAllListeners('keyboardWillHide');
    setSheetState(false);
  };
  useImperativeHandle(ref, () => ({
    dismissSheet,
  }));
  Keyboard.addListener('keyboardWillShow', () => {
    sheet.current?.snapToIndex(3);
  })
  Keyboard.addListener('keyboardWillHide', () => {
    sheet.current?.snapToIndex(2);
  })
  
  return (
    <>
      <Button
        className="button flex items-center w-full btn-fill h-16 secondary justify-between flex-row"
        onPress={toggleSheet}
      >
        <View className="flex-row items-center justify-between w-full">
          <ThemedText className="tlg opacity-80">{placeholder}</ThemedText>
          <MaterialCommunityIcons name="chevron-down" size={34} color={Colors.highlight.main} />
        </View>
      </Button>
      
      <BottomSheetModal
        index={2}
        snapPoints={[1, '40%', "60%", '90%']}
        enableHandlePanningGesture
        onDismiss={dismissSheet}
        enableContentPanningGesture={true}
        enableDismissOnClose
        onChange={(index) => {
          if (index === 1 || index === 0) {
            sheet.current?.dismiss();
            setSheetState(false);
          }
        }}
        
        handleStyle={{
          backgroundColor: Colors[colorScheme].primary,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
        }}
        
        keyboardBehavior='extend'
        keyboardBlurBehavior='restore'
        handleIndicatorStyle={{
          backgroundColor: Colors[colorScheme].text,
          width: '33%',
        }}
        backgroundStyle={{
          backgroundColor: Colors[colorScheme].primary,
        }}
        ref={sheet}
      >
        <BottomSheetFlashList
          ListHeaderComponent={() => (
            <View className="flex flex-col highlight">
              {FlashListProps.ListHeaderComponent ? (FlashListProps.ListHeaderComponent as ReactNode) : <></>}
            </View>
          )}
          bounces={false}
          overScrollMode="never"
          
          {...FlashListProps}
        />
      </BottomSheetModal>
    </>
  );
});

export default SheetSelection;
