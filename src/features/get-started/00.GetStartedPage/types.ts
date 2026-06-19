import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { FormData } from "@/shared/lib/types";

export type GetStartedPageProps = Record<string, never>;

export type FormStepProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  t: (key: string) => string;
};
