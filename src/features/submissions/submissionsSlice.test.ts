import { describe, expect, it } from "vitest";
import {
  addSubmission,
  clearSubmissions,
  selectCountries,
  selectSubmissions,
  submissionsReducer,
} from "./submissionsSlice";
import type { Submission } from "../../types/types";

const submission: Submission = {
  id: "submission-1",
  source: "uncontrolled",
  name: "Alice",
  age: 25,
  email: "alice@example.com",
  gender: "female",
  terms: true,
  image: "data:image/png;base64,aW1hZ2U=",
  password: "pass",
  confirmPassword: "pass",
  country: "Belarus",
  createdAt: "2026-06-08T00:00:00.000Z",
};

describe("submissionsSlice", () => {
  it("stores and clears submissions", () => {
    const stateWithSubmission = submissionsReducer(undefined, addSubmission(submission));

    expect(stateWithSubmission.items).toEqual([submission]);
    expect(stateWithSubmission.countries).toContain("Belarus");
    expect(submissionsReducer(stateWithSubmission, clearSubmissions()).items).toEqual([]);
  });

  it("selects submissions and countries from root state", () => {
    const submissionsState = submissionsReducer(undefined, addSubmission(submission));
    const rootState = {
      submissions: submissionsState,
    };

    expect(selectSubmissions(rootState)).toEqual([submission]);
    expect(selectCountries(rootState)).toContain("Belarus");
  });
});
