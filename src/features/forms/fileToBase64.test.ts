import { describe, expect, it, vi } from "vitest";
import { fileToBase64 } from "./fileToBase64";

describe("fileToBase64", () => {
  it("converts a file to a data url", async () => {
    const file = new File(["image"], "avatar.png", { type: "image/png" });
    const readAsDataURL = vi
      .spyOn(FileReader.prototype, "readAsDataURL")
      .mockImplementation(function (this: FileReader) {
      Object.defineProperty(this, "result", {
        configurable: true,
        value: "data:image/png;base64,aW1hZ2U=",
      });
      this.onload?.({} as ProgressEvent<FileReader>);
    });

    await expect(fileToBase64(file)).resolves.toBe("data:image/png;base64,aW1hZ2U=");

    readAsDataURL.mockRestore();
  });
});
