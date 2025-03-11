/**
   * Kép feltöltések válasza
   */
export interface Image {
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
