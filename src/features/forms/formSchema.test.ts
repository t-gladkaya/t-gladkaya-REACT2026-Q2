import { describe, expect, it } from "vitest";
import { createFormSchema } from "./formSchema";

const imageFile = new File(["image"], "avatar.png", { type: "image/png" });

const validValues = {
  name: "Alice",
  age: "25",
  email: "alice@example.com",
  gender: "female",
  terms: true,
  password: "pass",
  confirmPassword: "pass",
  country: "France",
  image: imageFile,
};

describe("formSchema", () => {
  it("validates a country against the provided store list", () => {
    const schema = createFormSchema(["France"]);

    expect(schema.safeParse(validValues).success).toBe(true);
    expect(schema.safeParse({ ...validValues, country: "Belarus" }).success).toBe(false);
  });

  it("rejects invalid email, lowercase name and mismatched passwords", () => {
    const schema = createFormSchema(["France"]);
    const result = schema.safeParse({
      ...validValues,
      name: "alice",
      email: "alice@example",
      confirmPassword: "different",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.path.join("."))).toEqual(
        expect.arrayContaining(["name", "email", "confirmPassword"])
      );
    }
  });

  it("rejects images with unsupported type or excessive size", () => {
    const schema = createFormSchema(["France"]);
    const textFile = new File(["text"], "avatar.txt", { type: "text/plain" });
    const oversizedImage = new File([new Uint8Array(1024 * 1024 + 1)], "avatar.jpg", {
      type: "image/jpeg",
    });

    expect(schema.safeParse({ ...validValues, image: textFile }).success).toBe(false);
    expect(schema.safeParse({ ...validValues, image: oversizedImage }).success).toBe(false);
  });
});
