"use client";

import { EMAIL, PHONE_NUMBER } from "@/shared/lib/constants";
import { useRef } from "react";

export const usePrint = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const print = () => {
    if (!printRef.current) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Website Project Request</title>
          <style>
            body { 
              margin: 0; 
              padding: 20px; 
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              background: white;
              color: #222222;
            }
            .printHeader { 
              text-align: center; 
              margin-bottom: 30px;
              border-bottom: 3px solid #6b4eff;
              padding-bottom: 20px;
            }
            .printSection { 
              margin-bottom: 25px;
              break-inside: avoid;
            }
            .printSectionTitle { 
              color: #6b4eff;
              border-bottom: 2px solid #f0f0f0;
              padding-bottom: 8px;
              margin-bottom: 15px;
              font-size: 18px;
            }
            .printFieldGroup { 
              margin-bottom: 12px;
            }
            .printFieldLabel { 
              font-weight: 600;
              color: #333;
              margin-bottom: 4px;
            }
            .printFieldValue { 
              color: #666;
              padding-left: 15px;
            }
            .printFeatures { 
              list-style: none;
              padding: 0;
            }
            .printFeature { 
              background: #f5f5f5;
              padding: 6px 12px;
              margin: 4px;
              border-radius: 4px;
              display: inline-block;
            }
            .printFooter { 
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              color: #999;
              font-size: 14px;
            }
            @media print {
              body { margin: 1cm; }
              .printSection { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="printHeader">
            <h1 style="color: #6b4eff; margin: 0 0 10px 0;">Nasaq Digital Solutions</h1>
            <h2 style="color: #333; margin: 0 0 5px 0;">Website Project Request Confirmation</h2>
            <p style="color: #666; margin: 0;">Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          ${printRef.current.innerHTML}
          <div class="printFooter">
            <p>Thank you for choosing Nasaq for your digital transformation journey.</p>
            <p><strong>Contact:</strong> ${EMAIL} | +2${PHONE_NUMBER} | Cairo, Egypt</p>
            <p>This proposal is valid for 30 days from the date of generation.</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return { printRef, print };
};
