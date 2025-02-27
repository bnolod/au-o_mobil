import { GroupPost } from "@/lib/entity/Group"
import { LoginRequest, RegisterRequest } from "./types"
import { EventPost } from "@/lib/entity/SocialEvent"
import { Car } from "@/lib/entity/Car"

export const MOCK_nickname: string = "TesztNickname"
export const MOCK_invalidNickname: string = "t"
export const MOCK_username: string = "TesztUsername"
export const MOCK_invalidUsername: string = "t"
export const MOCK_groupPostData: GroupPost = {
    groupIcon: "TesztGroupIcon",
    groupName: "TesztGroupName",
    groupNickname: "TesztGroupNickname",
}
export const MOCK_eventPostData: EventPost = {
    attendees: 34,
    startDate: "2025-06-01",
    endDate: "2025-08-01",
    eventName: "TesztEventPoszt",
    location: "TesztHelyszin"
}
export const MOCK_validLoginData: LoginRequest = {
    password: "Teszt@Jelszo!123",
    usernameOrEmail: "teszt@bejelentkezes.com"
}
export const MOCK_invalidPasswordLoginData: LoginRequest = {
    password: "teszt",
    usernameOrEmail: "teszt@bejelentkezes.com"
}
export const MOCK_invalidIdentifierLoginData: LoginRequest = {
    password: "Teszt@Jelszo!123",
    usernameOrEmail: "e"
}
export const MOCK_invalidLoginData: LoginRequest = {
    password: "teszt",
    usernameOrEmail: "e"
}
export const MOCK_car: Car = {
    id: 1,
    productionYear: 2000,
    description: "igazi erőgép valódi M",
    type: "SEDAN",
    displacement: 1.6,
    horsepower: 120,
    manufacturer: "BMW",
    model: "M316i",
}
export const MOCK_validRegisterData: RegisterRequest & {confirmPassword: string} = {
    dateOfBirth: "2004-04-04",
    email: "teszt@bejelentkezes.com",
    nickname: "TesztNickname",
    password: "Teszt@Jelszo!123",
    username: "TesztFelhasznalonev",
    confirmPassword: "Teszt@Jelszo!123"
}