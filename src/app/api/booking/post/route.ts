import { firestore } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
// Define validation schema with Zod
const formSchema = z.object({
    // Step 1: Basic Information
    businessName: z.string().min(1),
    industry: z.string().min(1),

    // Step 2: Website Details
    websitePurpose: z.string().min(1),
    targetAudience: z.string().min(1),
    desiredFeatures: z.array(z.string()).min(1),
    hasExistingWebsite: z.boolean(),
    existingWebsiteUrl: z.string().optional(),

    // Step 3: Design Preferences
    colorPreferences: z.string().optional(),
    exampleWebsites: z.string().optional(),

    // Step 5: Timeline & Budget
    timeline: z.string().min(1),
    budgetRange: z.string().min(1),
    projectUrgency: z.string().optional(),

    // Step 6: Contact Information
    contactName: z.string().min(1),
    contactEmail: z.string().min(1),
    contactPhone: z.string().min(1),
    contactMethod: z.string().min(1),
    additionalNotes: z.string().optional(),
});

// POST handler
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = formSchema.safeParse(body);
        console.log("Parsed data:", parsed);
        if (!parsed.success) {
            const error = JSON.parse(parsed.error.message)[0].message
            console.error("Validation errors:", error);
            return NextResponse.json(
                { error: error || "Validation error", details: parsed.error, ok: false },
                { status: 400 }
            );
        }

        const data = parsed.data;
        const emailBody = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Website Project Request - Nasaq</title>
    <style>
        /* Reset styles for email compatibility */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #222222;
            background-color: #ffffff;
        }
        
        .email-header {
            background: linear-gradient(135deg, #6b4eff, #8e7dff);
            padding: 30px;
            text-align: center;
            color: white;
        }
        
        .email-content {
            padding: 30px;
            background-color: #f5f5f5;
        }
        
        .section {
            background-color: #ffffff;
            margin-bottom: 20px;
            border-radius: 8px;
            padding: 25px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border-left: 4px solid #6b4eff;
        }
        
        .section-title {
            color: #6b4eff;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 15px;
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 10px;
        }
        
        .field-group {
            margin-bottom: 15px;
        }
        
        .field-label {
            font-weight: 600;
            color: #222222;
            margin-bottom: 5px;
            display: block;
        }
        
        .field-value {
            color: #666666;
            padding: 8px 12px;
            background-color: #f8f8f8;
            border-radius: 4px;
            border-left: 3px solid #8e7dff;
        }
        
        .features-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .feature-item {
            background-color: #f0f0f0;
            margin-bottom: 5px;
            padding: 8px 12px;
            border-radius: 4px;
            display: inline-block;
            margin-right: 8px;
        }
        
        .urgency-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .urgency-high {
            background-color: #ff9800;
            color: white;
        }
        
        .urgency-moderate {
            background-color: #4caf50;
            color: white;
        }
        
        .urgency-low {
            background-color: #2196f3;
            color: white;
        }
        
        .contact-method {
            display: inline-block;
            padding: 6px 15px;
            background-color: #6b4eff;
            color: white;
            border-radius: 4px;
            font-weight: 600;
        }
        
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #1e1e1e;
            color: #a0a0a0;
            font-size: 14px;
        }
        
        .logo {
            font-size: 28px;
            font-weight: 700;
            background: linear-gradient(135deg, #6b4eff, #8e7dff);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            display: inline-block;
            margin-bottom: 10px;
        }
        
        .action-button {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(135deg, #6b4eff, #8e7dff);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 10px 5px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <div class="logo">Nasaq</div>
            <h1 style="margin: 10px 0; font-size: 24px; font-weight: 700;">New Website Project Request</h1>
            <p style="margin: 0; opacity: 0.9;">A new client has submitted a website creation request</p>
        </div>
        
        <!-- Content -->
        <div class="email-content">
            <!-- Basic Information Section -->
            <div class="section">
                <h2 class="section-title">📋 Business Information</h2>
                
                <div class="field-group">
                    <span class="field-label">Business Name</span>
                    <div class="field-value">${data.businessName}</div>
                </div>
                
                <div class="field-group">
                    <span class="field-label">Industry</span>
                    <div class="field-value">${data.industry}</div>
                </div>
            </div>
            
            <!-- Website Details Section -->
            <div class="section">
                <h2 class="section-title">🌐 Website Requirements</h2>
                
                <div class="field-group">
                    <span class="field-label">Website Purpose</span>
                    <div class="field-value">${data.websitePurpose}</div>
                </div>
                
                <div class="field-group">
                    <span class="field-label">Target Audience</span>
                    <div class="field-value">${data.targetAudience}</div>
                </div>
                
                <div class="field-group">
                    <span class="field-label">Desired Features</span>
                    <div>
                        ${data.desiredFeatures.map(feature => `<span class="feature-item">${feature}</span>`)}
                    
                    </div>
                </div>
                
                <div class="field-group">
                    <span class="field-label">Existing Website</span>
                    <div class="field-value">
                    ${data.hasExistingWebsite ? `Yes - ${data.existingWebsiteUrl || 'No URL provided'}` : 'No existing website'
            }
                
                    </div>
                </div>
            </div>
            
            <!-- Design Preferences Section -->
            <div class="section">
                <h2 class="section-title">🎨 Design Preferences</h2>
                
                <div class="field-group">
                    <span class="field-label">Color Preferences</span>
                    <div class="field-value">
                        ${data.colorPreferences ? data.colorPreferences : 'Not specified'}
                        
                    </div>
                </div>
                
                <div class="field-group">
                    <span class="field-label">Example Websites</span>
                    <div class="field-value">
                        ${data.exampleWebsites ? data.exampleWebsites : 'Not specified'}
                    </div>
                </div>
            </div>
            
            <!-- Timeline & Budget Section -->
            <div class="section">
                <h2 class="section-title">⏰ Timeline & Budget</h2>
                
                <div class="field-group">
                    <span class="field-label">Preferred Timeline</span>
                    <div class="field-value">${data.timeline}</div>
                </div>
                
                <div class="field-group">
                    <span class="field-label">Budget Range</span>
                    <div class="field-value" style="color: #4caf50; font-weight: 600;">${data.budgetRange}</div>
                </div>
                
                <div class="field-group">
                    <span class="field-label">Project Urgency</span>
                    <div class="field-value">
                    ${data.projectUrgency ? `<span class="urgency-badge urgency-{${data.projectUrgency}}">${data.projectUrgency}</span>` : 'Not specified'}
                    </div>
                </div>
            </div>
            
            <!-- Contact Information Section -->
            <div class="section">
                <h2 class="section-title">📞 Contact Information</h2>
                
                <div class="field-group">
                    <span class="field-label">Contact Person</span>
                    <div class="field-value">${data.contactName}</div>
                </div>
                
                <div class="field-group">
                    <span class="field-label">Email Address</span>
                    <div class="field-value">
                        <a href="mailto:${data.contactEmail}" style="color: #6b4eff; text-decoration: none;">${data.contactEmail}</a>
                    </div>
                </div>
                
                <div class="field-group">
                    <span class="field-label">Phone Number</span>
                    <div class="field-value">
                        <a href="tel:${data.contactPhone}" style="color: #6b4eff; text-decoration: none;">${data.contactPhone}</a>
                    </div>
                </div>
                
                <div class="field-group">
                    <span class="field-label">Preferred Contact Method</span>
                    <div class="field-value">
                        <span class="contact-method">${data.contactMethod}</span>
                    </div>
                </div>
                
                
                <div class="field-group">
                    <span class="field-label">Additional Notes</span>
                    <div class="field-value">${data.additionalNotes ? data.additionalNotes : "No Notes"}</div>
                </div>
                
            </div>
            
            <!-- Action Buttons -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${data.contactEmail}?subject=Regarding your website project&body=Hi ${data.contactName}," class="action-button">Reply via Email</a>
                <a href="tel:${data.contactPhone}" class="action-button" style="background: linear-gradient(135deg, #4caf50, #45a049);">Call Client</a>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div style="margin-bottom: 15px;">
                <div class="logo" style="color: white; -webkit-background-clip: initial; background-clip: initial;">Nasaq</div>
            </div>
            <p style="margin: 5px 0;">Digital Solutions for Modern Businesses</p>
            <p style="margin: 5px 0; font-size: 12px;">Cairo, Egypt | info@nasaq.com | +20 123 456 7890</p>
            <p style="margin: 15px 0 0 0; font-size: 12px; color: #888;">
                This email was generated automatically from the website contact form.<br>
                &copy; 2024 Nasaq. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
        `
        const receiver = process.env.RECEIVER_EMAIL ?? ""
        const { error } = await resend.emails.send({
            from: `Developer <${process.env.SENDER_EMAIL}>`,
            to: receiver,
            subject: "New Form Submission",
            html: emailBody,
        });
        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json({ error: "Internal server error" }, { status: 500 });
        }
        const docRef = collection(firestore, "booking");
        const result = await addDoc(docRef, { ...data, createdAt: new Date() });

        return NextResponse.json({ id: result.id, ok: true }, { status: 201 });
    } catch (error) {
        console.error("Error saving booking:", error);
        return NextResponse.json(
            { error: "Internal server error", ok: false },
            { status: 500 }
        );
    }
}
