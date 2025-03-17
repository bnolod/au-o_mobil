/**
 * Csoport szerkesztésének kérésének entitása
 * @category Request
 * @module request/GroupEditRequest
 */

/**
 * Csoport szerkesztésének kérésének entitása
    * @interface
    * @see Group
 */
export interface GroupEditRequest {
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
