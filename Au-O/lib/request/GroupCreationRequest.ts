/**
 * Csoport létrehozásának kérésének entitása
 * @category Request
 * @module request/GroupCreationRequest
 */

/**
 * Csoport létrehozásának kérésének entitása
 * @interface
 * @see Group
 */
export interface GroupCreationRequest {
  /**
   * Csoport neve
   * @type {string}
   */
  name: string;
  /**
   * Csoport leírása
   * @type {string}
   */

  description: string;
  /**
   * Csoport kép URL
   * @type {string}
   */
  bannerImage: string;
  /**
   * Csoport rövidített neve
   * @type {string}
   */

  alias: string;
  /**
   * Csoport láthatósága (publikus?)
   * @type {boolean}
   */

  public: boolean;
}
