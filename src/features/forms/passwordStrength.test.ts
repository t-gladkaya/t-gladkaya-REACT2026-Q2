import { describe, expect, it } from "vitest";
import { getPasswordStrength } from "./passwordStrength";

describe("getPasswordStrength", () => {
  it("detects password character groups", () => {
    expect(getPasswordStrength("Aa1!")).toEqual({
      hasNumber: true,
      hasUppercase: true,
      hasLowercase: true,
      hasSpecial: true,
    });
  });

  it("returns false for missing groups", () => {
    expect(getPasswordStrength("abc")).toEqual({
      hasNumber: false,
      hasUppercase: false,
      hasLowercase: true,
      hasSpecial: false,
    });
  });
});
