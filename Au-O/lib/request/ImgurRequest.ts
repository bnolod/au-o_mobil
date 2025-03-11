/**
 * Kép eltárolásának kérésének entitása
 * @interface
 * @see Image
 */
export interface ImageStoreRequest {
  /**
   * Kép szövege
   * @type {string}
   */
  text: string;
  /**
   * Képek
   * @type {ImageUploadResponse[]}
   */
  postImages: ImageUploadResponse[];
  /**
   * Hely
   * @type {string}
   */
  location: string;
  /**
   * Jármű azonosító
   * @type {number | null}
   */
  vehicleId: number | null;
}
/**
 * Kép feltöltések válasza
 * @deprecated
 * @interface
 */
export interface ImageUploadResponse {
  /**
   * Kép URL
   * @type {string}
   */
  url: string;
  /**
   * Kép törlésének hash értéke
   * @type {string}
   */
  deleteHash: string;
}
