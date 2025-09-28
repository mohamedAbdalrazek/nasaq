// components/LoadingPage.tsx
import styles from "./Loading.module.css";

interface LoadingPageProps {
    type?: "spinner" | "dots" | "pulse" | "progress" | "skeleton";
    message?: string;
    fullScreen?: boolean;
    size?: "small" | "medium" | "large";
}

const LoadingPage: React.FC<LoadingPageProps> = ({
    type = "spinner",
    message = "Loading...",
    fullScreen = true,
    size = "medium",
}) => {
    const renderLoader = () => {
        switch (type) {
            case "dots":
                return (
                    <div className={styles.dotsLoader}>
                        <div className={styles.dot}></div>
                        <div className={styles.dot}></div>
                        <div className={styles.dot}></div>
                    </div>
                );

            case "pulse":
                return (
                    <div className={styles.pulseLoader}>
                        <div className={styles.pulseCircle}></div>
                    </div>
                );

            case "progress":
                return (
                    <div className={styles.progressLoader}>
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill}></div>
                        </div>
                    </div>
                );

            case "skeleton":
                return (
                    <div className={styles.skeletonLoader}>
                        <div className={styles.skeletonLine}></div>
                        <div className={styles.skeletonLine}></div>
                        <div className={styles.skeletonLine}></div>
                    </div>
                );

            default: // spinner
                return (
                    <div className={styles.spinnerLoader}>
                        <div className={styles.spinner}></div>
                    </div>
                );
        }
    };

    const containerClass = `${styles.loadingContainer} ${
        fullScreen ? styles.fullScreen : styles.inline
    } ${styles[size]}`;

    return (
        <div className={containerClass}>
            <div className={styles.loadingContent}>
                {renderLoader()}
                {message && <p className={styles.loadingMessage}>{message}</p>}
            </div>

            {/* Animated background elements */}
            {fullScreen && (
                <>
                    <div
                        className={styles.floatingOrb}
                        style={{ "--delay": "0s" } as React.CSSProperties}
                    ></div>
                    <div
                        className={styles.floatingOrb}
                        style={{ "--delay": "2s" } as React.CSSProperties}
                    ></div>
                    <div
                        className={styles.floatingOrb}
                        style={{ "--delay": "4s" } as React.CSSProperties}
                    ></div>
                </>
            )}
        </div>
    );
};

export default LoadingPage;
