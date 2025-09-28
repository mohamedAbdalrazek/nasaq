export type FormData = {
    // Step 1: Basic Information
    businessName: string;
    industry: string;

    // Step 2: Website Details
    websitePurpose: string;
    targetAudience: string;
    desiredFeatures: string[];
    hasExistingWebsite: boolean;
    existingWebsiteUrl?: string;

    // Step 3: Design Preferences
    colorPreferences?: string;
    exampleWebsites?: string;

    // Step 5: Timeline & Budget
    timeline: string;
    budgetRange: string;
    projectUrgency?: string;

    // Step 6: Contact Information
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    contactMethod: string;
    additionalNotes?: string;
};