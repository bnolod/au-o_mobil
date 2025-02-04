import { BottomSheetFlashList, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { ReactNode, useRef } from "react";
import Button from "./Button";
import { BottomSheetFlashListProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/BottomSheetFlashList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ThemedText from "./ThemedText";
import { View } from "react-native";
import { Colors } from "@/constants/Colors";
import { CommonStaticElementProps } from "@/constants/types";
export default function SheetSelection({FlashListProps, language, colorScheme}: {FlashListProps: BottomSheetFlashListProps<any>} & CommonStaticElementProps
) {
    const [sheetState, setSheetState] = React.useState(false)
    const toggleSheet = () => {
        sheet.current?.dismiss()
        if (!sheetState) {
            sheet.current?.present()
            sheet.current?.snapToIndex(1)
        }
        setSheetState(!sheetState)
        }
    const sheet = useRef<BottomSheetModal>(null)
    return (
        <>        
          <Button className="button btn-fill mt-2 h-14 w-full secondary justify-between flex-row" onPress={toggleSheet}>
            <View className="flex-row items-center justify-between w-full">

            <ThemedText className="text-lg font-semibold text-white">Select</ThemedText>
            <MaterialCommunityIcons name="chevron-down" size={34} color={Colors.highlight.main} />
            </View>
        </Button>
            
        <BottomSheetModal index={2} snapPoints={[1, "40%", "60%"]} enableDismissOnClose onChange={(index) => {
            if (index === 1 || index === 0) {
                sheet.current?.dismiss()
                setSheetState(false)
            }
        }} handleStyle={{
            backgroundColor: Colors[colorScheme].primary,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
        }}
        handleIndicatorStyle={{
            backgroundColor: Colors[colorScheme].text,
            
            width: "33%",
        }}
        backgroundStyle={{
            backgroundColor: Colors[colorScheme].primary,
        }} ref={sheet}>
<BottomSheetFlashList  {...FlashListProps} />
        </BottomSheetModal>
        </>
    )
}