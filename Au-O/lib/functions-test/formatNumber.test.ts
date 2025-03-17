import { formatNumber } from "../functions"

test("A számformázó funkció elérhető", () => {
    expect(formatNumber).toBeDefined()
})
test("(1K) Az eredmény olvasható rövidítésre lesz formázva", () => {
    expect(formatNumber(1900,"EN")).toStrictEqual("1.9K")
})
test("(10K) Az eredmény olvasható rövidítésre lesz formázva", () => {
    expect(formatNumber(19000,"EN")).toStrictEqual("19.0K")
})
test("(100K) Az eredmény olvasható rövidítésre lesz formázva", () => {
    expect(formatNumber(190000,"EN")).toStrictEqual("190K")
})
test("(1M) Az eredmény olvasható rövidítésre lesz formázva", () => {
    expect(formatNumber(1900000,"EN")).toStrictEqual("1.9M")
})
test("(10M) Az eredmény olvasható rövidítésre lesz formázva", () => {
    expect(formatNumber(19000000,"EN")).toStrictEqual("19.0M")
})
test("(100M) Az eredmény olvasható rövidítésre lesz formázva", () => {
    expect(formatNumber(190000000,"EN")).toStrictEqual("190M")
})
test("(1B) Az eredmény olvasható rövidítésre lesz formázva", () => {
    expect(formatNumber(1900000000,"EN")).toStrictEqual("1.9B")
})