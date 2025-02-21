import { CommonStaticElementProps, TextEditModalProps } from "@/constants/types";
import { useState } from "react";
import {
    Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import Input from "../ui/Input";
import { TouchableOpacity } from "react-native-gesture-handler";
import ThemedText from "../ui/ThemedText";
import { EditModalTexts } from "@/constants/texts";

export default function TextEditModal({
  initialValue,
  onSave,
  onCancel,
  visible,
  labelComponent,
  colorScheme,
  language,
  lines,
  placeholder,
}: TextEditModalProps & CommonStaticElementProps) {
  const [value, setValue] = useState<string>(initialValue || "");
  function handleCancel() {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
      return;
    }
    if (value === initialValue) {
        onCancel && onCancel();
    } else
    Alert.alert(EditModalTexts.alert.title[language], EditModalTexts.alert.subheading[language], [
        {
            text: EditModalTexts.alert.discard[language],
            style: "destructive",
            onPress: () => {
            onCancel && onCancel();
            },
        },
        {
            text: EditModalTexts.alert.keepEditing[language],
            onPress: () => {return},
            isPreferred: true,
        },
    ]
)
  }
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <ScrollView className=" bg-black/50" style={{ flex: 1 }}>
      <KeyboardAvoidingView
          style={{
            flex: 1,
          }}
          behavior="position"
        >
        <TouchableOpacity
          onPress={handleCancel}
          className="text-edit-modal"
        >
            
          <Input
            TextInputProps={{
              value: value,
              onChangeText: setValue,
              placeholder: placeholder,
              multiline: lines && lines > 1? true : false,
              numberOfLines: lines || 1,
              style: {
                height: lines ? lines * 40 : 40,
                
              },
              autoFocus: true,
            }}
            containerClassName={`w-11/12 h-screen flex justify-center items-center m-auto`}
            label={labelComponent}
            colorScheme={colorScheme}
            
          />
        </TouchableOpacity>

          <TouchableWithoutFeedback
            onPress={() => {
              onSave(value);
              setValue("");
            }}
          >
            <ThemedText className="p-3 mt-12text-xl absolute font-bold w-full text-center rounded-xl bottom-12 bg-highlight">
              {EditModalTexts.save[language]}
            </ThemedText>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </Modal>
  );
}
