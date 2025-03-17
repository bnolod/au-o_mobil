import { formatDate } from "../functions"

test("Dátum formázás funkció definiálva van", () => {
    expect(formatDate).toBeDefined()
})
test("Dátum formázás funkció működik érvényes adattal", () => {
    expect(formatDate("2025-03-17")).toStrictEqual("2025. 03. 17.")
})
test("Dátum formázás funkció működik nap nélküli adattal", () => {
    expect(formatDate("2025-03")).toStrictEqual("2025. 03.")
})
test("Dátum formázás funkció működik hónap és nap nélküli adattal", () => {
    expect(formatDate("2025")).toStrictEqual("2025.")
})
test("Dátum formázás funkció működik hónap és év nélküli adattal", () => {
    expect(formatDate("12")).toStrictEqual("12.")
})
