import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  hotelVenue: z.string().min(2, "Hotel / Venue name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  eventType: z.string().min(1, "Please select an event type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
