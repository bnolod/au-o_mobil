/**
 * @description Csoport létrehozásának kérésének entitása
 * @param name Csoport neve
 * @param description Csoport leírása
 * @param bannerImage Csoport kép URL
 * @param alias Csoport rövidített neve
 * @param public Csoport láthatósága
 */
export interface GroupCreationRequest {
  name: string;
  description: string;
  bannerImage: string;
  alias: string;
  public: boolean;
}
