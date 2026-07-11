import { requestOptions } from "./types";
import { ApiUrl } from "./constants";

export async function sendRequest(options: requestOptions) {
    try {
        const response = await fetch(ApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${options.publicKey}`
            },
            body: JSON.stringify(options.Data)
        });

        return response;

    } catch (error) {
        throw new Error(
            "PostDrop: Network request failed. Please check your internet connection and try again."
        );
    }
}