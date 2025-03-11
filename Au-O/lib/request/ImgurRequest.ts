/**
 * @description Kép eltárolásának kérésének entitása
 * @param text Kép leírása
 * @param postImages Kép URI-k
 * @param location Kép helye
 * @param vehicleId Opcionális autó azonosító
 */
  export interface ImageStoreRequest {
    text: string;
    postImages: ImageUploadResponse[];
    location: string;
    vehicleId: number | null;
  }
  /**
   * @description Kép feltöltések válasza
   * @param url Kép URL
   * @param deleteHash Kép törlési hash
   */
  export interface ImageUploadResponse {
    url: string;
    deleteHash: string;
  }