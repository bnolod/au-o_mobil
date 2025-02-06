jest.mock("expo-secure-store", () => ({
    getItemAsync: jest.fn()
}))

import * as SecureStore from 'expo-secure-store'
import { getTimestamp } from "../functions";

test("SecureStore definiálva van", () => {
    expect(SecureStore).toBeDefined()
})
test("getTimestamp visszaadja az elmentett időbélyeget", async () => {
    await getTimestamp()
    expect(SecureStore.getItemAsync).toHaveBeenCalledTimes(1)
})