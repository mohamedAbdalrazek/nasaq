export type LoadingProps = {
    type?: "spinner" | "dots" | "pulse" | "progress" | "skeleton";
    message?: string;
    fullScreen?: boolean;
    size?: "small" | "medium" | "large";
};
