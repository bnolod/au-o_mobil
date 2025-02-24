import { ReactNode } from "react";

export interface TextEditModalProps {
    visible: boolean;
    onSave: (text: string) => void;
    onCancel?: () => void;
    initialValue?: string;
    labelComponent?: ReactNode;
    placeholder?: string;
    lines?: number;
  }
  