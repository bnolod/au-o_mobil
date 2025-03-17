/**
 * Általános elemekhez használt tulajdonságok
 * @module components/ui/props
 * @category Props
 */
import { ReactNode } from 'react';
import { TextInputProps, TextProps, TouchableOpacityProps } from 'react-native';
import { Comment } from '@/lib/entity/Comment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Reply } from '@/lib/entity/Reply';
import { User } from '@/lib/entity/User';
/**
 * Gomb tulajdonságok
 * @extends TouchableOpacityProps
 * @interface
 */
export interface ButtonProps extends TouchableOpacityProps {
  /**
   * Gomb variáns
   * @type {string}
   * @default 'fill'
   */
  variant?:
    | 'highlight' //piros
    | 'highlight-light' //világos piros
    | 'highlight-dark' //sötét piros
    | 'transparent' //fill és border nélkül
    | 'outline'; //csak border
  /**
   * Gomb típusa
   * @type {string}
   */
  type?:
    | 'icon' //kerek, w=h
    | 'fit' //tartalom szélességéhez igazodik
    | 'fill'; //container szélességéhez igazodik
  /**
   * Gomb leszármazottjai
   * @type {ReactNode}
   */
  children?: React.ReactNode;
  /**
   * Rezgés visszajelzés
   * @type {'light' | 'medium' | 'heavy'}
   */
  hapticFeedback?: 'light' | 'medium' | 'heavy';
  /**
   * Gomb belső szöveg osztály
   * @type {string}
   */
  innerTextClassName?: string;
}
/**
 * Értesítés modal tulajdonságok
 * @interface
 */
export interface AlertModalProps {
  /**
   * Láthatóság
   * @type {boolean}
   */
  visible: boolean;
  /**
   * Cím
   * @type {string}
   */
  title: string;
  /**
   * Bezárás esemény
   * @returns {void}
   */
  onDismiss: () => void;
  /**
   * Tartalom
   * @type {string}
   */
  text: string;
  /**
   * Gombok
   * @type {(AlertModalButtonProps | undefined)[]}
   */
  buttons: (AlertModalButtonProps | undefined)[];
}
/**
 * Értesítés modal gomb tulajdonságok
 * @interface
 */
export interface AlertModalButtonProps {
  /**
   * Gomb szövege
   * @type {string}
   */
  text: string;
  /**
   * Gomb stílusa
   * @returns {void}
   */
  className?: string;
  /**
   * Szöveg stílusa
   * @type {string}
   */
  textClassName?: string;
  /**
   * Kattintási esemény
   * @returns {void}
   */
  onPress: () => void;
}
/**
 * Avatar tulajdonságok
 * @interface
 */
export interface AvatarProps {
  /**
   * Az avatar kép forrása
   * @type {any}
   */
  image: any;

  /**
   * További osztálynevek a stílushoz
   * @type {string}
   */
  className?: string;

  /**
   * Becenév megjelenítése az avatar mellett
   * @type {string}
   */
  nickname?: string;

  /**
   * Az avatar szélessége
   * @type {number | string}
   */
  width?: number | string;

  /**
   * Az avatar magassága
   * @type {number | string}
   */
  height?: number | string;
}
/**
 * Összecsukható szöveg tulajdonságok
 * @interface
 */
export interface CollapsibleTextProps {
  /**
   * A szöveg hossza, amely után összecsukódik
   * @type {number}
   */
  restrictedLineCount?: number;
  /**
   * Tartalom
   */
  children: ReactNode;
  /**
   * Stílus
   */
  className?: string;
  /**
   * Szöveg tulajdonságok
   * @type {TextProps}
   * @see TextProps
   */
  TextProps?: TextProps;
}
/**
 * Komment elem tulajdonságok
 * @interface
 */
export interface CommentElementProps {
  /**
   * Komment elem
   * @type {Comment}
   */
  item: Comment;
  /**
   * Előnézet?
   * @type {boolean}
   */
  preview?: boolean;
  /**
   * Felhasználó azonosító
   * @type {number}
   */
  userId: number;
  /**
   * Komment törlési esemény
   * @param id Komment azonosító
   * @returns {void}
   */
  onDelete: (id: number) => void;
  /**
   * Szerző azonosító
   * @type {number}
   */
  authorId: number;
}
/**
 * Szűrő sáv tulajdonságok
 * @interface
 */
export interface FilterBarProps {
  /**
   * Stílus
   * @type {string}
   */
  className?: string;
  /**
   * Változás esemény
   */
  onChange: (text: string) => void;
  /**
   * Alapértelmezett érték kijelzése
   */
  placeholder?: string;
  /**
   * Alapértelmezett érték
   */
  initialValue?: string;
}
/**
 * Beviteli mező tulajdonságok
 * @interface
 */
export interface InputProps {
  /**
   * Beviteli mező címkéje
   * @type {string | ReactNode}
   */
  label?: string | ReactNode;
  /**
   * Biztonságos szöveg bevitel
   * @type {boolean}
   */
  secureTextEntry?: boolean;
  /**
   * Beviteli mező tulajdonságai
   * @type {TextInputProps}
   */
  TextInputProps?: TextInputProps;
  /**
   * Beviteli mező stílusa
   * @type {string}
   */
  containerClassName?: string;
  /**
   * Méret
   */
  size?: number;
  /**
   * Ikon
   * @type {keyof typeof MaterialCommunityIcons.glyphMap}
   */
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  /**
   * Szín séma
   * @type {'light' | 'dark'}
   */
  colorScheme: 'light' | 'dark';
}
/**
 * Betöltő modal tulajdonságok
 * @interface
 */
export interface LoadingModalProps {
  /**
   * Betöltés állapota
   * @type {boolean}
   */
  loading: boolean;
  /**
   * Szöveg
   * @type {string}
   */
  text?: string;
  /**
   * Kezdés esemény
   * @returns {void}
   */
  onStart?: () => void;
  /**
   * Befejezés esemény
   * @returns {void}
   */
  onEnd?: () => void;
}
/**
 * Reakció gomb tulajdonságok
 * @interface
 */
export interface ReactionButtonProps {
  /**
   * Reakció típusa
   * @type {'FIRE' | 'HEART' | 'COOL'}
   */
  type: 'FIRE' | 'HEART' | 'COOL';
  /**
   * Reakciók száma
   * @type {number}
   */
  count: number;
  /**
   * Kattintási esemény
   * @returns {void}
   */
  onPress?: () => void;
  /**
   * Aktív állapot
   * @type {'active' | 'inactive'}
   */
  state: 'active' | 'inactive';
  /**
   * Előzetes reakció állapot
   * @type {'FIRE' | 'HEART' | 'COOL' | null}
   */
  initialReactionState: 'FIRE' | 'HEART' | 'COOL' | null;
}
/**
 * Válasz elem tulajdonságok
 * @interface
 */
export interface ReplyProps {
  /**
   * Válasz elem
   * @type {Reply}
   */
  item: Reply;
  /**
   * Nyelv
   * @type {'HU' | 'EN'}
   */
  language: 'HU' | 'EN';
  /**
   * Felhasználó azonosító
   * @type {number}
   */
  userId: number;
  /**
   * Előnézet?
   * @type {boolean}
   */
  preview?: boolean;
  /**
   * Szerző azonosító
   * @type {number}
   */
  authorId: number;
  /**
   * Törlés kezelése
   * @param {number} id Törlésre szánt válasz azonosítója
   * @returns {void}
   */
  onDelete: (id: number) => void;
}
/**
 * Kereső sáv tulajdonságok
 * @interface
 */
export interface SearchBarProps {
  /**
   * Alapértelmezett kijelzett szöveg
   * @type {string}
   */
  placeholder?: string;
  /**
   * Keresés esemény
   * @param query Keresett szöveg
   * @returns {void}
   */
  onSearch: (query: string) => void;
  /**
   * Szöveg módosítás esemény
   * @param query Szöveg
   * @returns {void}
   */
  onChangeText?: (query: string) => void;
}
/**
 * Téma szöveg tulajdonságok
 * @interface
 * @extends TextProps
 */
export interface ThemedTextProps extends TextProps {
  /**
   * Gyerek elemek
   * @type {ReactNode}
   */
  children?: ReactNode;
  /**
   * Stílus
   * @type {string}
   */
  className?: string;
  /**
   * Szín
   * @type {string}
   */
  color?: string;
}
/**
 * Felhasználó lista kártya tulajdonságok
 * @interface
 */
export interface UserListCardProps {
  /**
   * Felhasználó
   * @type {User}
   */
  user: User;
  /**
   * Zárási esemény
   * @returns {void}
   */
  dismissSheet: () => void;
  /**
   * Tulajdonos?
   * @type {boolean}
   */
  isOwner: boolean;
  /**
   * Követő típus
   * @type {'follower' | 'following'}
   */
  type: 'follower' | 'following';
}
/**
 * Érintési wrapper tulajdonságok
 * @interface
 */
export interface TapWrapperProps {
  /**
   * Egyetlen érintés esemény
   * @returns {void}
   */
  onSingleTap?: () => void;
  /**
   * Dupla érintés esemény
   * @returns {void}
   */
  onDoubleTap?: () => void;
  /**
   * Leszármazott elemek
   * @type {ReactNode}
   */
  children: React.ReactNode;
}
