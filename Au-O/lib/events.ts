import { EventEmitter } from 'events';
import * as Haptics from 'expo-haptics';
export const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(1);
/**
 * Sortörést kezelő funkció
 * @param {number | undefined} lines aktuális sorok száma
 * @param {number} maxLines maximum kiírt sorok száma
 * @returns {number | undefined} kezelt sorszám
 */
export function handleShowMore(lines: number | undefined, maxLines: number): number | undefined {
  return lines === maxLines ? undefined : maxLines;
}
/**
 * Reakció végpontjának lekérése
 * @param {Reactions} reaction reakció típusa
 * @returns {keyof Reaction} reakció típusa
 */
export function getReactionEndpoint(reaction: 'fire' | 'heart' | 'sunglasses') {
  switch (reaction) {
    case 'fire':
      return 'FIRE';
    case 'heart':
      return 'HEART';
    case 'sunglasses':
      return 'COOL';
  }
}
/**
 * Profil fül váltás kezelése
 * @param {'POST' | 'GROUPS' | 'SAVED' | 'GARAGE'} tab aktuális fül
 * @returns kiválasztott fül
 */
export function handleTabSelection(tab: 'POST' | 'GROUPS' | 'SAVED' | 'GARAGE') {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  return tab;
}



