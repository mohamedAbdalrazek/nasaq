import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import ConfirmationPage from "./ConfirmationPage";

const booking = {
    id: "2CVTfX9f5KFUNmvvrEGV",
    createdAt: {
        type: "firestore/timestamp/1.0",
        seconds: 1762443895,
        nanoseconds: 500000000,
    },
    exampleWebsites: "",
    industry: "Technology",
    additionalNotes: "",
    projectUrgency: "urgent",
    contactEmail: "mohamed@gmail.com",
    businessName: "nasq",
    contactPhone: "+201005798846",
    budgetRange: "$500 - $1,000",
    websitePurpose: "sdawda",
    existingWebsiteUrl: "",
    timeline: "ASAP (Within 2 weeks)",
    desiredFeatures: ["Contact Form", "User Accounts"],
    contactMethod: "email",
    contactName: "adwdaww",
    hasExistingWebsite: false,
    targetAudience: "awdwa",
    colorPreferences: "dwad",
};

jest.mock("@/shared/components/Loading", () => ({
    Loading: ({ size }: { size: string }) => <div>Loading... {size}</div>,
}));
jest.mock("@/i18n/navigation", () => ({
    Link: ({ children, href }: { children: ReactNode; href: string }) => (
        <a href={href}>{children}</a>
    ),
}));
jest.mock("next/navigation", () => ({
    useParams: () => ({ id: 123 }),
}));

describe("ConfirmationPage", () => {
    it("shows the application information", async () => {
        //@ts-expect-error till i found a fixs
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(booking),
            }),
        );

        render(<ConfirmationPage />);
        const businessName = await screen.findByText(booking.businessName);
        const industry = screen.getByText(booking.industry);
        const websitePurpose = screen.getByText(booking.websitePurpose);
        const targetAudience = screen.getByText(booking.targetAudience);
        const existingWebsite = screen.getByText(/no existing website/i);
        const colorPreferences = screen.getByText(booking.colorPreferences);
        const exampleWebsites = screen.queryByText("Example Websites");
        const budgetRange = screen.getByText(booking.budgetRange);
        const timeline = screen.getByText(booking.timeline);
        const projectUrgency = screen.getByText(
            new RegExp(booking.projectUrgency, "i"),
        );
        const contactName = screen.getByText(booking.contactName);
        const contactEmail = screen.getByRole("link", {
            name: booking.contactEmail,
        });
        const contactPhone = screen.getByRole("link", {
            name: booking.contactPhone,
        });
        const contactMethod = screen.getByText(booking.contactMethod);

        const additionalNotes = screen.queryByText("Additional Notes");

        expect(businessName).toBeInTheDocument();
        expect(industry).toBeInTheDocument();
        expect(websitePurpose).toBeInTheDocument();
        expect(targetAudience).toBeInTheDocument();
        expect(existingWebsite).toBeInTheDocument();
        expect(colorPreferences).toBeInTheDocument();
        expect(budgetRange).toBeInTheDocument();
        expect(timeline).toBeInTheDocument();
        expect(projectUrgency).toBeInTheDocument();
        expect(contactName).toBeInTheDocument();
        expect(contactEmail).toBeInTheDocument();
        expect(contactPhone).toBeInTheDocument();
        expect(contactMethod).toBeInTheDocument();

        expect(contactEmail).toHaveAttribute(
            "href",
            `mailto:${booking.contactEmail}`,
        );
        expect(contactPhone).toHaveAttribute(
            "href",
            `tel:${booking.contactPhone}`,
        );

        expect(exampleWebsites).not.toBeInTheDocument();
        expect(additionalNotes).not.toBeInTheDocument();

        for (const feature of booking.desiredFeatures) {
            const el = screen.getByText(feature);
            expect(el).toBeInTheDocument();
        }
    });

    it("shows no booking found when booking is null", async () => {
        //@ts-expect-error till i found a fixs
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ error: "no booking found" }),
            }),
        );
        render(<ConfirmationPage />);
        const error = await screen.findByText(/no booking found/i);
        expect(error).toBeInTheDocument();
    });
    it("handle network errors", async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error("network error"));
        render(<ConfirmationPage />);
        const error = await screen.findByText(/network error/i);
        expect(error).toBeInTheDocument();
    });
});
