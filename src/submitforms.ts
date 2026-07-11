import type { SubmitFormOptions } from "./types";
import { sendRequest } from "./request";

export async function submitForm(options: SubmitFormOptions) {
    try {

        // 1. Validate inputs
        const { publicKey, formData } = options;

        if (!publicKey) {
            throw new Error("Public key is required.");
        }

        if (!formData) {
            throw new Error("Form data is required.");
        }

        const normalizedFormData =
            formData instanceof FormData
                ? Object.fromEntries(formData.entries())
                : formData;

        // 2. Bot protection
        const { postdrop_honeypot, ...Data } = normalizedFormData;

        if (postdrop_honeypot) {
            return {
                success: true,
                status: 200,
                message: "Form submitted successfully."
            };
        }

        // 3. Send request
        const result = await sendRequest({
            publicKey,
            Data
        });

        const body = await result.json();

        if (result.ok) {
            return {
                success: true,
                status: 201,
                message: "Form submitted successfully."
            };
        }
        else {
            return {
                success: false,
                status: result.status,
                message: body.message
            }
        }

    } catch (error) {
        throw error;
    }
}