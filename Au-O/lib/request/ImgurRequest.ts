
  export interface ImageStoreRequest {
    text: string;
    postImages: ImageUploadResponse[];
    location: string;
    vehicleId: number | null;
  }
  export interface ImageUploadResponse {
    url: string;
    deleteHash: string;
  }