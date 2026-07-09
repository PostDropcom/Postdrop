import type { SubmitFormOptions } from "./types";
import { sendRequest } from "./request";

export async function submitForm(options: SubmitFormOptions) {
    try {
        console.log("PostDrop package is running");

        // 1. Validate inputs
        const { publicKey, formData } = options;

        if (!publicKey) {
            throw new Error("Public key is required.");
        }

        if (!formData) {
            throw new Error("Form data is required.");
        }

        // 2. Bot protection
        const { postdrop_honeypot, ...Data } = formData;

        if (postdrop_honeypot) {
            return {
                success: true,
                ok : true,
                message: "Form submitted successfully."
            };
        }

        // 3. Send request
        const result = await sendRequest({
            publicKey,
            Data
        });

        // 4. Return response
        if(result.ok){
            return {
                success: true,
                ok : true,
                message: "Form submitted successfully."
            };
        }

    } catch (error) {
        throw error;
    }
}