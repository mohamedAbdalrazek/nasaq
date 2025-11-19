import { FormData } from "@/lib/types";
import { useState } from "react";
import { UseFormTrigger } from "react-hook-form";

export const useSteps = (steps:{ title: string; fields: string[] }[], trigger:UseFormTrigger<FormData>, totalSteps : number) => {
    const [currentStep, setCurrentStep] = useState(1);
    const nextStep = async () => {
        const currentFields = steps[currentStep - 1].fields;

        // Trigger validation only for current step's fields
        const isStepValid = await trigger(currentFields as (keyof FormData)[], {
            shouldFocus: true,
        });

        if (!isStepValid) {
            return; // stop if validation fails
        }

        
        // Move to next step safely
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const goToStep = (step: number) => {
        if (step < currentStep || step === 1) {
            setCurrentStep(step);
        }
    };
    return { nextStep, prevStep, goToStep, currentStep }
}