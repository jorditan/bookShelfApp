import { useState, useCallback } from "react";

export function useToast(duration = 3000) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "info">("info");

  const showToast = useCallback(
    (msg: string, toastType: typeof type = "info") => {
      setMessage(msg);
      setType(toastType);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, duration);
    },
    [duration]
  );

  return {
    visible,
    message,
    type,
    showToast,
    hideToast: () => setVisible(false),
  };
}
