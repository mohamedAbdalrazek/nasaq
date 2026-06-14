import type { JSX } from "react";

export type ServiceMap = {
    title: string;
    description: string;
    features: string[];
    icon: JSX.Element;
};

export type ServicesProps = Record<string, never>;
