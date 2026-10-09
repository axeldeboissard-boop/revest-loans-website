/**
 * Design: Coastal Trust Architecture.
 * Static-site compatibility shim: archived pages retain their form UI while
 * the lead endpoint is intentionally unavailable until a CRM or backend is connected.
 */
import { useCallback, useState } from "react";

type MutationOptions = {
  onSuccess?: (data: { success: boolean }) => void;
  onError?: (error: Error) => void;
};

function useStaticLeadMutation(options: MutationOptions) {
  const [isPending, setIsPending] = useState(false);
  const mutate = useCallback((_payload: unknown) => {
    setIsPending(true);
    window.setTimeout(() => {
      setIsPending(false);
      options.onError?.(new Error("Lead storage is not connected in this static handoff build."));
    }, 250);
  }, [options]);

  return { mutate, isPending };
}

export const trpc = {
  leads: {
    submit: {
      useMutation: useStaticLeadMutation,
    },
  },
};
