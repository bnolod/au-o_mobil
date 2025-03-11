/**
 * @description Csoport szerkesztésének kérésének entitása
 * @param name Csoport neve
 * @param description Csoport leírása
 * @param alias Csoport rövidített neve
 * @param public Csoport láthatósága
 */
export interface GroupEditRequest {
    name: string,
    description: string,
    alias: string,
    public: boolean
}