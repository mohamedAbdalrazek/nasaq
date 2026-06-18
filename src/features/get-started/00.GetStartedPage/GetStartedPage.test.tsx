import { deepEqual } from "@/shared/lib/functions";
import {
    fillStep1,
    fillStep2,
    fillStep4,
    goToStep,
} from "@/shared/lib/testing-functions";
import { FormData } from "@/shared/lib/types";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import toast from "react-hot-toast";
import GetStartedPage from "./GetStartedPage";

const mockData: FormData = {
    desiredFeatures: ["features.blog"],
    hasExistingWebsite: false,
    businessName: "nasaq",
    industry: "industries.technology",
    websitePurpose: "ecommerce",
    targetAudience: "young",
    colorPreferences: "",
    exampleWebsites: "",
    timeline: "timelines.asap",
    budgetRange: "budget.under300",
    projectUrgency: "",
    contactName: "john",
    contactEmail: "john@john.com",
    contactPhone: "01005798846",
    contactMethod: "email",
    additionalNotes: "",
};

global.fetch = jest.fn();

jest.mock("@/i18n/navigation", () => ({
    useRouter: () => ({ push: jest.fn() }),
}));
jest.mock("next-intl", () => ({
    useTranslations: () => (key: string) => key,
}));
jest.mock("react-hot-toast", () => {
    const mockToast = {
        success: jest.fn(),
        error: jest.fn(),
        loading: jest.fn(),
        custom: jest.fn(),
        dismiss: jest.fn(),
    };

    return {
        __esModule: true,
        default: mockToast,
        Toaster: () => null,
    };
});

const mockFetch = (data = { ok: true, id: "123" }) => {
    //@ts-expect-error mock
    global.fetch.mockResolvedValue({
        ok: true,
        json: async () => data,
    });
};

const renderComponent = () => {
    render(<GetStartedPage />);
    const nextButton = screen.getByRole("button", { name: /next/ });

    return nextButton;
};

describe("GetStartedPage", () => {
    const user = userEvent.setup();
    beforeEach(() => {
        jest.clearAllMocks();
        mockFetch();
    });

    it("Validates the first step", async () => {
        const nextButton = renderComponent();
        await user.click(nextButton);
        expect(screen.getByText(/requiredBusiness/)).toBeInTheDocument();
        expect(screen.getByText(/requiredIndustry/)).toBeInTheDocument();
    });
    it("Validates second step", async () => {
        const nextButton = renderComponent();

        await goToStep(user, mockData, 2);
        await user.click(nextButton);
        expect(screen.getByText(/requiredPurpose/)).toBeInTheDocument();
        expect(screen.getByText(/requiredAudience/)).toBeInTheDocument();
        expect(screen.getByText(/requiredFeatures/)).toBeInTheDocument();
    });
    it("Checks the third step", async () => {
        renderComponent();

        await goToStep(user, mockData, 3);

        const thirdInputs = screen.getAllByRole("textbox");
        expect(thirdInputs).toHaveLength(2);
    });
    it("Validates fourth step", async () => {
        const nextButton = renderComponent();

        await goToStep(user, mockData, 4);
        await user.click(nextButton);
        expect(screen.getByText(/requiredTimeline/)).toBeInTheDocument();
        expect(screen.getByText(/requiredBudget/)).toBeInTheDocument();
    });
    it("Validates fifth step", async () => {
        const nextButton = renderComponent();

        await goToStep(user, mockData, 5);
        const fifthInputEmail = screen.getByRole("textbox", { name: /email/i });
        const fifthInputNumber = screen.getByRole("textbox", {
            name: /phone/i,
        });
        await user.click(nextButton);

        expect(screen.getByText(/requiredName/)).toBeInTheDocument();
        expect(screen.getByText(/requiredEmail/)).toBeInTheDocument();
        expect(screen.getByText(/requiredPhone/)).toBeInTheDocument();
        expect(screen.getByText(/requiredMethod/)).toBeInTheDocument();

        await user.type(fifthInputEmail, "john");
        await user.type(fifthInputNumber, "123");
        await user.click(nextButton);
        expect(screen.getByText(/invalidEmail/)).toBeInTheDocument();
        expect(screen.getByText(/invalidPhone/)).toBeInTheDocument();
        await user.clear(fifthInputEmail);
        await user.clear(fifthInputNumber);
        await user.type(fifthInputEmail, "john@john");
        await user.click(nextButton);
        expect(screen.getByText(/invalidEmail/)).toBeInTheDocument();
    });
    it("Validates fetch function", async () => {
        renderComponent();

        await goToStep(user, mockData, 6);
        expect(global.fetch).toHaveBeenCalledTimes(1);

        //@ts-expect-error till i found a fixs
        const [url, options] = global.fetch.mock.calls[0];

        expect(url).toBe("/api/booking/post");
        expect(options.method).toBe("POST");
        expect(options.headers["Content-Type"]).toBe("application/json");

        const sentData = JSON.parse(options.body);
        expect(deepEqual(sentData, mockData)).toEqual(true);
    });
    it("handles fetch failure gracefully", async () => {
        //@ts-expect-error mock
        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: "Server error" }),
        });

        renderComponent();

        await goToStep(user, mockData, 6);
        expect(toast.error).toHaveBeenCalledTimes(1);
        expect(toast.error).toHaveBeenCalledWith("Failed to submit booking");
    });
    it("handles network errors", async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error("network error"));
        renderComponent();

        await goToStep(user, mockData, 6);

        expect(toast.error).toHaveBeenCalledTimes(1);
        expect(toast.error).toHaveBeenCalledWith("network error");
    });
    it("Checks the step numbers activation", async () => {
        const nextButton = renderComponent();

        const firstStepButton = screen.getByRole("button", { name: /step 1/ });
        expect(firstStepButton.className).toMatch(/stepDot/);
        expect(firstStepButton.className).toMatch(/active/);

        await fillStep1(user, mockData);
        await user.click(nextButton);

        const secondStepButton = screen.getByRole("button", { name: /step 2/ });
        expect(secondStepButton.className).toMatch(/stepDot/);
        expect(secondStepButton.className).toMatch(/active/);

        await fillStep2(user, mockData);
        await user.click(nextButton);

        const thirdStepButton = screen.getByRole("button", { name: /step 3/ });
        expect(thirdStepButton.className).toMatch(/stepDot/);
        expect(thirdStepButton.className).toMatch(/active/);

        await user.click(nextButton);

        const fourthStepButton = screen.getByRole("button", { name: /step 4/ });
        expect(fourthStepButton.className).toMatch(/stepDot/);
        expect(fourthStepButton.className).toMatch(/active/);

        await fillStep4(user, mockData);
        await user.click(nextButton);

        const fifthStepButton = screen.getByRole("button", { name: /step 5/ });
        expect(fifthStepButton.className).toMatch(/stepDot/);
        expect(fifthStepButton.className).toMatch(/active/);
    });
    it("Checks the previous button", async () => {
        renderComponent();

        expect(screen.queryByRole("button", { name: /previous/ })).toBeNull();
        await goToStep(user, mockData, 2);
        const prevButton = screen.getByRole("button", { name: /previous/ });
        await user.click(prevButton);
        const firstStepButton = screen.getByRole("button", { name: /step 1/ });
        expect(firstStepButton.className).toMatch(/stepDot/);
        expect(firstStepButton.className).toMatch(/active/);
    });
});
