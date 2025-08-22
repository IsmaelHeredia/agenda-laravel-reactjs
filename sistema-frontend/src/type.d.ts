import { PaletteColor, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {

    customIconButton?: {
      background?: string,
      color?: string,
      hover?: string
    };

    customTextField?: {
      colorLabel?: string,
      colorText?: string,
      borderColor?: string,
      borderHoverColor?: string,
      borderFocusColor?: string,
      icon?: string
    };

    customButton?: {
      colorBackground?: string,
      colorText?: string
    };

    customNavbar?: {
      background?: string,
      color?: string,
      menuTextColor?: string,
      icon?: string
    };

    customIconNavbar?: {
      background?: string
    };

    customChip?: {
      background?: string,
      color?: string
    };

    customList?: {
      background?: string,
      color?: string
    };

  }

  interface PaletteOptions {

    customIconButton?: {
      background?: string,
      color?: string,
      hover?: string
    };

    customTextField?: {
      colorLabel?: string,
      colorText?: string,
      borderColor?: string,
      borderHoverColor?: string,
      borderFocusColor?: string,
      icon?: string
    };

    customButton?: {
      colorBackground?: string,
      colorText?: string
    };

    customNavbar?: {
      background?: string,
      color?: string
      menuTextColor?: string
      icon?: string
    };

    customIconNavbar?: {
      background?: string
    };

    customChip?: {
      background?: string,
      color?: string
    };

    customList?: {
      background?: string,
      color?: string
    };

  }
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export interface UserProfileData {
  username: string;
  profileImageUrl: string;
}

export interface ProfileSettingsModalProps {
  open: boolean;
  onClose: () => void;
  initialData: UserProfileData;
}

export interface UserFormInputs {
  username: string;
}

export interface PasswordFormInputs {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}