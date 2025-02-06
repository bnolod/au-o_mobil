import { setItemAsync } from "expo-secure-store";

jest.mock("expo-secure-store", () => ({
    setItemAsync: jest.fn()
}))

import * as SecureStore from 'expo-secure-store'
import { setTimestamp } from "../functions";

test("SecureStore definiálva van", () => {
    expect(SecureStore).toBeDefined()

})

test("setTimestamp bélyegzi és elmenti az aktuális időt", async () => {
    await setTimestamp()
    expect(SecureStore.setItemAsync).toHaveBeenCalledTimes(1)
})