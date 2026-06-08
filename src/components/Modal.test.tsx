import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Modal from "./Modal";

describe("Modal", () => {
  it("renders children through a portal and closes on outside click", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal isOpen onClose={onClose}>
        <button type="button">Focusable content</button>
      </Modal>
    );

    const dialog = screen.getByRole("dialog", { name: "Form modal" });

    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Focusable content" })).toBeInTheDocument();

    await user.click(dialog.parentElement as HTMLElement);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes on Escape and returns focus to the opener", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const { rerender } = render(
      <>
        <button type="button">Open form</button>
        <Modal isOpen={false} onClose={onClose}>
          <button type="button">Inside</button>
        </Modal>
      </>
    );

    const opener = screen.getByRole("button", { name: "Open form" });
    opener.focus();

    rerender(
      <>
        <button type="button">Open form</button>
        <Modal isOpen onClose={onClose}>
          <button type="button">Inside</button>
        </Modal>
      </>
    );

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);

    rerender(
      <>
        <button type="button">Open form</button>
        <Modal isOpen={false} onClose={onClose}>
          <button type="button">Inside</button>
        </Modal>
      </>
    );

    expect(screen.getByRole("button", { name: "Open form" })).toHaveFocus();
  });
});
