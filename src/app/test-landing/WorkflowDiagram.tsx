// components/WorkflowDiagram.tsx
import styles from "./WorkflowDiagram.module.css";

const WorkflowDiagram = () => {
    const steps = [
        {
            title: "Initial Consultation",
            shortTitle: "Consultation",
            icon: "💬",
        },
        {
            title: "Project Planning",
            shortTitle: "Planning",
            icon: "📋",
        },
        {
            title: "Design Creation",
            shortTitle: "Design",
            icon: "🎨",
        },
        {
            title: "Development Phase",
            shortTitle: "Development",
            icon: "💻",
        },
        {
            title: "Review & Feedback",
            shortTitle: "Review",
            icon: "🔍",
        },
        {
            title: "Launch Project",
            shortTitle: "Launch",
            icon: "🚀",
        },
        {
            title: "Ongoing Support",
            shortTitle: "Support",
            icon: "🔧",
        },
    ];

    return (
        <section className={styles.workflow} id="how-it-works">
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        Our <span className="text-gradient">Workflow</span>
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Streamlined process for exceptional results
                    </p>
                </div>

                <div className={styles.diagramContainer}>
                    <div className={styles.workflowDiagram}>
                        {steps.map((step, index) => (
                            <div key={index} className={styles.stepWrapper}>
                                <div className={styles.step}>
                                    <div className={styles.stepTitle}>
                                        {step.title}
                                    </div>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={styles.connector}>
                                        <div
                                            className={styles.connectorLine}
                                        ></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Tooltip on hover */}
                    <div className={styles.tooltipContainer}>
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={styles.tooltip}
                                data-step={index}
                            >
                                <h4>{step.title}</h4>
                                <p>
                                    {index === 0 &&
                                        "We understand your goals, target audience, and requirements."}
                                    {index === 1 &&
                                        "We create a project roadmap with structure, features, and timeline."}
                                    {index === 2 &&
                                        "We craft a modern, user-friendly design that matches your brand."}
                                    {index === 3 &&
                                        "We build your website with clean code and best practices."}
                                    {index === 4 &&
                                        "You review the site, and we apply refinements."}
                                    {index === 5 &&
                                        "We publish your website and make it live for the world."}
                                    {index === 6 &&
                                        "We provide ongoing updates, maintenance, and improvements."}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkflowDiagram;
