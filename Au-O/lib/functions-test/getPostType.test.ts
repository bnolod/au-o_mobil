import { MOCK_event, MOCK_eventPostData, MOCK_group, MOCK_groupPostData, MOCK_nickname, MOCK_username } from "@/constants/mocks.test";
import { getPostType } from "../functions";

test("A bejegyzés típusa USER", () => {
  expect(getPostType(MOCK_nickname, MOCK_username, null, null)).toBe("USER");
});
test("A bejegyzés típusa GROUP", () => {
  expect(getPostType(MOCK_nickname, MOCK_username, MOCK_group, MOCK_event)).toBe("GROUP");
});
test("A bejegyzés típusa GROUP", () => {
  expect(getPostType(MOCK_nickname, MOCK_username, MOCK_group, null)).toBe("GROUP");
});
test("A bejegyzés típusa EVENT", () => {
  expect(getPostType(MOCK_nickname, MOCK_username, null, MOCK_event)).toBe("EVENT");
});

