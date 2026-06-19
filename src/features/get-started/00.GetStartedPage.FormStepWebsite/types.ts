import type { FormStepProps } from "../00.GetStartedPage/types";

export type FormStepWebsiteProps = FormStepProps & {
  features: string[];
  hasExistingWebsite: boolean;
};
