import { requestOptions } from "./types";
import { ApiUrl } from "./constants";

export async function sendRequest(options: requestOptions) {
    const response = await fetch(ApiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${options.publicKey}`
        },
        body: JSON.stringify(options.Data)
    });

    if (!response.ok) {
        throw new Error("Failed to submit form.");
    }
    
    return response;
}