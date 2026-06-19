import type { FormStepProps } from "../00.GetStartedPage/types";

export type FormStepTimelineProps = FormStepProps & {
  timelines: string[];
  budgetRanges: string[];
};
