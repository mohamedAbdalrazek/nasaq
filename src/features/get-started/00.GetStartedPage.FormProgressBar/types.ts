export type FormProgressBarProps = {
    currentStep: number;
    totalSteps: number;
    steps: { title: string; fields: string[] }[];
    sending: boolean;
    goToStep: (step: number) => void;
};
