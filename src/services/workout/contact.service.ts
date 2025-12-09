"use server";

import { dataFetch } from "@/src/lib/data-fetch";
import { revalidateTag } from "next/cache";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function contact(payload: ContactPayload) {
  try {
    const response = await dataFetch.post(`/contact`, {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("contact",{});
    }

    return result;
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, message: "Something went wrong." };
  }
}
