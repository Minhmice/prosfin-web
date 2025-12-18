import { toast } from "sonner";

export function notifySuccess(message: string, description?: string) {
  return toast.success(message, {
    description,
  });
}

export function notifyError(message: string, description?: string) {
  return toast.error(message, {
    description,
  });
}

export function notifyInfo(message: string, description?: string) {
  return toast.info(message, {
    description,
  });
}

export function notifyWarning(message: string, description?: string) {
  return toast.warning(message, {
    description,
  });
}
