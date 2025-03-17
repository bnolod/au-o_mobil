/**
 * Beállítások oldal props-ai
 * @module settings/props
 * @category Component
 */
import { MaterialCommunityIcons } from '@expo/vector-icons';
/**
 * Beállítások oldal props-ai
 * @interface
 */
export interface SettingsAsideProps {
  /**
   * Felhasználó azonosító
   * @type {string}
   */
  userId: string;
  /**
   * Felhasználó felhasználóneve
   * @type {string}
   */
  username: string;
  /**
   * Elérhető beállítások
   * @type {SettingsOption[]}
   */
  availableSettings: SettingsOption[];
}
/**
 * Beállítások oldal gomb opciók
 * @interface
*/
export interface SettingsOption {
  /**
   * Gomb címe
   * @type {string}
   */
  title: string;
  /**
   * Gomb ikonja
   * @type {keyof typeof MaterialCommunityIcons.glyphMap}
   */
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  /**
   * Gomb elem
   * @returns {void}
   */
  onPress: () => void;
  /**
   * Gomb stílusa
   * @type {string}
   */
  className?: string;
}
