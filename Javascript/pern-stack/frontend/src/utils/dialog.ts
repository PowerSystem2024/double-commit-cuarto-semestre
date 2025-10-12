import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";

export const showDialog = ({ content }: { content: ReactNode }) => {
  const dialog = document.createElement("dialog");
  document.body.appendChild(dialog);

  const root = createRoot(dialog);
  const controller = new AbortController();

  dialog.style.animation = "slideIn 0.3s ease-in"
  dialog.showModal();
  root.render(content);

  const closeDialogWithAnimation = () => {
    dialog.style.animation = "slideOut .3s ease-out";

    dialog.addEventListener(
      "animationend",
      () => {
        dialog.close();
        dialog.remove();
        root.unmount();
        controller.abort();
      },
      { once: true, signal: controller.signal }
    );
  };

  dialog.addEventListener("click", (event: MouseEvent) => {
    const firstChildDialog = document.querySelector("dialog")?.firstChild;
    if (dialog.open && !firstChildDialog?.contains(event.target as Node)) {
      closeDialogWithAnimation();
    }
  }, { signal: controller.signal });
};
