import { UserEvent } from "@testing-library/user-event";
import { FormData } from "./types";
import { screen } from "@testing-library/dom";

export const pause = () => {
    return new Promise((resolve) => {
        return setTimeout(resolve, 1000);
    });
};

export const fillStep1 = async (user: UserEvent, data: FormData) => {
    const businessInput = screen.getByRole("textbox", {
        name: /labels.businessName/,
    });
    const industrySelect = screen.getByRole("combobox", {
        name: /labels.industry/,
    });
    await user.type(businessInput, data.businessName);
    await user.selectOptions(industrySelect, data.industry);
};

export const fillStep2 = async (user: UserEvent, data: FormData) => {
    await user.type(
        screen.getByRole("textbox", { name: /purpose/i }),
        data.websitePurpose,
    );
    await user.type(
        screen.getByRole("textbox", { name: /audience/i }),
        data.targetAudience,
    );
    await user.click(
        screen.getByRole("checkbox", { name: data.desiredFeatures[0] }),
    );
};

export const fillStep4 = async (user: UserEvent, data: FormData) => {
    await user.selectOptions(
        screen.getByRole("combobox", { name: /timeline/i }),
        data.timeline,
    );
    await user.selectOptions(
        screen.getByRole("combobox", { name: /range/i }),
        data.budgetRange,
    );
};

export const fillStep5 = async (user: UserEvent, data: FormData) => {
    await user.type(
        screen.getByRole("textbox", { name: /name/i }),
        data.contactName,
    );
    await user.type(
        screen.getByRole("textbox", { name: /email/i }),
        data.contactEmail,
    );
    await user.type(
        screen.getByRole("textbox", { name: /phone/i }),
        data.contactPhone,
    );
    await user.selectOptions(screen.getByRole("combobox"), data.contactMethod);
};

const clickNextOrSubmit = async (user: UserEvent) => {
    const button = screen.getByRole("button", { name: /next|submit/i });
    await user.click(button);
};

export const goToStep = async (
    user: UserEvent,
    mockData: FormData,
    stepNumber: number,
) => {
    if (stepNumber > 1) {
        await fillStep1(user, mockData);
        await clickNextOrSubmit(user);
    }
    if (stepNumber > 2) {
        await fillStep2(user, mockData);
        await clickNextOrSubmit(user);
    }
    if (stepNumber > 3) {
        await clickNextOrSubmit(user);
    }
    if (stepNumber > 4) {
        await fillStep4(user, mockData);
        await clickNextOrSubmit(user);
    }
    if (stepNumber > 5) {
        await fillStep5(user, mockData);
        await clickNextOrSubmit(user);
    }
};
