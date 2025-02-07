import { MOCK_eventPostData, MOCK_groupPostData, MOCK_nickname, MOCK_username } from "@/constants/mocks.test";
import { getPostType } from "../functions";

test("A bejegyzés típusa USER", () => {
  expect(getPostType(MOCK_nickname, MOCK_username, undefined, undefined)).toBe("USER");
});
test("A bejegyzés típusa GROUP", () => {
  expect(getPostType(MOCK_nickname, MOCK_username, MOCK_groupPostData, undefined)).toBe("GROUP");
});
test("A bejegyzés típusa GROUP", () => {
  expect(getPostType(MOCK_nickname, MOCK_username, MOCK_groupPostData, MOCK_eventPostData)).toBe("GROUP");
});
test("A bejegyzés típusa EVENT", () => {
  expect(getPostType(MOCK_nickname, MOCK_username, undefined, MOCK_eventPostData)).toBe("EVENT");
});

