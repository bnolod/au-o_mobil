/**
 * Alap Home komponenshez tartozó propsok
 * @module home/base/props
 * @category Components 
 */
import { ReactNode } from "react";
/**
 * Text szerkesztő modal ablak tulajdonságai
 * @interface
 */
export interface TextEditModalProps {
  /**
   * Látható-e
    @type {boolean}
   */
    visible: boolean;
    /**
     * Mentési esemény
     * @param text Szöveg
     * @returns {void}
     */
    onSave: (text: string) => void;
    /**
     * Visszavonási esemény
     * @returns {void}
     */
    onCancel?: () => void;
    /**
     * Alapértelmezett érték
     * @type {string}
     */
    initialValue?: string
    /**
     * Címke komponens
     * @type {ReactNode}
     */
    labelComponent?: ReactNode;
    /**
     * Alapértelmezetten kijelzett szöveg
     * @type {string}
     */
    placeholder?: string;
    /**
     * Maximális sorok száma
     * @type {number}
     */
    lines?: number;
  }
  