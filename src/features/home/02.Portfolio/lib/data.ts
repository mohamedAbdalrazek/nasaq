export type ProjectData = {
    imageSrc: string;
    imageAlt: string;
    href: string;
    titleKey: "marakebTitle" | "razanTitle" | "clinicTitle" | "afifTitle";
    descKey: "marakebDesc" | "razanDesc" | "clinicDesc" | "afifDesc";
};

export const projects: ProjectData[] = [
    {
        imageSrc: "/projects/marakeb.png",
        imageAlt: "marakeb Car Rental Website",
        href: "http://marakeb.co/",
        titleKey: "marakebTitle",
        descKey: "marakebDesc",
    },
    {
        imageSrc: "/projects/razan.png",
        imageAlt: "Razan Academy Website",
        href: "https://razan-academy.net/",
        titleKey: "razanTitle",
        descKey: "razanDesc",
    },
    {
        imageSrc: "/projects/clinic.png",
        imageAlt: "ENT Clinic Website",
        href: "http://clinicent.vercel.app/",
        titleKey: "clinicTitle",
        descKey: "clinicDesc",
    },
    {
        imageSrc: "/projects/afif.png",
        imageAlt: "Afif Website",
        href: "http://afif-app.vercel.app/",
        titleKey: "afifTitle",
        descKey: "afifDesc",
    },
];
