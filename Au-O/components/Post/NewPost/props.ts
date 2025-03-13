/**
 * Poszt létrehozás lap elemek tulajdonságai
 * @module post/NewPost/props
 * @category Components
 */

/**
 * Poszt létrehozási kártya elemek
 * @interface
 */
export interface PostCreationSheetElementProps {
  /**
   * Csoport
   * @type {any}
   */
  group?: any;
  /**
   * Esemény
   * @type {any}
   */
  event?: any;
  /**
   *  Nyomás
   * @param selected a kiválasztott
   * @returns {void}
   */
  onPress: (selected: any) => void;
  /**
   * Cím
   * @type {string}
   */
  title: string;
}
