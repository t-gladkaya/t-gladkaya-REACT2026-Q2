import "@testing-library/jest-dom/vitest";
import { configureStore } from "@reduxjs/toolkit";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { submissionsReducer } from "../features/submissions/submissionsSlice";
import ReactHookForm from "./ReactHookForm";
import UncontrolledForm from "./UncontrolledForm";

const makeStore = () =>
  configureStore({
    reducer: {
      submissions: submissionsReducer,
    },
  });

const renderWithStore = (ui: React.ReactElement) => {
  const store = makeStore();

  render(<Provider store={store}>{ui}</Provider>);

  return store;
};

const fillValidForm = async () => {
  const user = userEvent.setup();
  const file = new File(["image"], "avatar.png", { type: "image/png" });

  await user.type(screen.getByLabelText("Name"), "Alice");
  await user.type(screen.getByLabelText("Age"), "25");
  await user.type(screen.getByLabelText("Email"), "alice@example.com");
  await user.click(screen.getByLabelText("Female"));
  await user.type(screen.getByLabelText("Country"), "Belarus");
  const imageInput = screen.getByLabelText("Upload file") as HTMLInputElement;
  await user.upload(imageInput, file);
  fireEvent.change(imageInput, { target: { files: [file] } });
  await user.type(screen.getByLabelText("Password"), "Aa1!");
  await user.type(screen.getByLabelText("Confirm password"), "Aa1!");
  await user.click(screen.getByLabelText("I accept Terms and Conditions"));

  return user;
};

describe("forms", () => {
  beforeEach(() => {
    vi.spyOn(FileReader.prototype, "readAsDataURL").mockImplementation(function (this: FileReader) {
      Object.defineProperty(this, "result", {
        configurable: true,
        value: "data:image/png;base64,aW1hZ2U=",
      });
      this.onload?.({} as ProgressEvent<FileReader>);
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("validates uncontrolled form on submit and keeps submit enabled", async () => {
    const user = userEvent.setup();

    renderWithStore(<UncontrolledForm onSuccess={vi.fn()} />);

    const submitButton = screen.getByRole("button", { name: "Submit" });

    expect(submitButton).toBeEnabled();

    await user.click(submitButton);

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Image is required")).toBeInTheDocument();
  });

  it("submits uncontrolled form data to Redux", async () => {
    const onSuccess = vi.fn();
    const store = renderWithStore(<UncontrolledForm onSuccess={onSuccess} />);
    const user = await fillValidForm();

    expect(screen.getByText("1 number")).toHaveClass("text-green-600");

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => expect(onSuccess).toHaveBeenCalledWith(expect.any(String)));

    const [submission] = store.getState().submissions.items;

    expect(submission).toMatchObject({
      source: "uncontrolled",
      name: "Alice",
      age: 25,
      email: "alice@example.com",
      country: "Belarus",
      image: "data:image/png;base64,aW1hZ2U=",
    });
  });

  it("keeps React Hook Form submit disabled until the form is valid", async () => {
    renderWithStore(<ReactHookForm onSuccess={vi.fn()} />);

    const submitButton = screen.getByRole("button", { name: "Submit" });

    expect(submitButton).toBeDisabled();

    await fillValidForm();

    await waitFor(() => expect(submitButton).toBeEnabled());
  });

  it("submits React Hook Form data to Redux", async () => {
    const onSuccess = vi.fn();
    const store = renderWithStore(<ReactHookForm onSuccess={onSuccess} />);
    const user = await fillValidForm();

    await waitFor(() => expect(screen.getByRole("button", { name: "Submit" })).toBeEnabled());
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => expect(onSuccess).toHaveBeenCalledWith(expect.any(String)));

    const [submission] = store.getState().submissions.items;

    expect(submission).toMatchObject({
      source: "react-hook-form",
      name: "Alice",
      age: 25,
      email: "alice@example.com",
      country: "Belarus",
      image: "data:image/png;base64,aW1hZ2U=",
    });
  });
});
