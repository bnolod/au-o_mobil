/**
 * Kezdőképernyő alap propjai
 * @module onboarding/base/props
 * @category Components
 */

/**
 * Kezdőképernyő fejlécének propjai
 * @interface
 */
export interface OnboardHeaderProps {
  /**
   * Statikus?
   * @type {boolean}
   */
    isStatic?: boolean;
    /**
     * Vissza gomb eseménye
     * @returns {void}
     */
    onBackPress?: () => void;
    /**
     * Átugrás gomb eseménye
     * @returns {void}
     */
    onSkipPress?: () => void;
    /**
     * Index
     */
    index?: number;
  }
   