"use server";

import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validations";

// Initialize Resend with key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY || "re_mock_key");

export async function sendContactInquiry(prevState: any, formData: FormData) {
  // Extract raw form data
  const rawFields = {
    name: formData.get("name") as string,
    hotelVenue: formData.get("hotelVenue") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    eventType: formData.get("eventType") as string,
    message: formData.get("message") as string,
  };

  // 1. Zod validation
  const validatedFields = contactFormSchema.safeParse(rawFields);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the validation errors below.",
    };
  }

  const { name, hotelVenue, email, phone, eventType, message } = validatedFields.data;

  try {
    // 2. Dispatch Email via Resend
    // (Note: With Resend free tier, you can send emails to your own registered email address)
    await resend.emails.send({
      from: "Residency Inquiries <inquiries@hrithikvirendra.com>",
      to: ["hrithikvirendramishra@gmail.com"], // Change this to your email
      replyTo: email,
      subject: `Residency Inquiry: ${hotelVenue} - ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; background-color: #F8F5F0; color: #1C1C1C;">
          <h2 style="color: #A67C52; border-bottom: 1px solid #E5DED2; padding-bottom: 12px; font-weight: normal; font-family: serif;">New Booking Inquiry</h2>
          <p><strong>Artist:</strong> Hrithik Virendra Mishra Portfolio</p>
          <p><strong>Sender Name:</strong> ${name}</p>
          <p><strong>Hotel / Venue:</strong> ${hotelVenue}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Event Type / Program:</strong> ${eventType}</p>
          <div style="margin-top: 24px; padding: 16px; background-color: #F2EEE7; border-radius: 8px;">
            <p style="margin-top: 0; font-weight: bold;">Message:</p>
            <p style="white-space: pre-wrap; margin-bottom: 0; line-height: 1.6;">${message}</p>
          </div>
        </div>
      `,
    });

    return {
      success: true,
      message: "Your inquiry has been successfully sent. We will get back to you shortly.",
    };
  } catch (error) {
    console.error("Resend Email Failure:", error);
    return {
      success: false,
      message: "Unable to process email right now. Please connect directly via WhatsApp.",
    };
  }
}
