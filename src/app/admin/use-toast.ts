// Shared toast utility — call from any admin page
export const showToast = (
  type: "success" | "error" | "info" | "warning",
  title: string,
  message?: string
) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("admin-toast", { detail: { type, title, message } })
    );
  }
};
