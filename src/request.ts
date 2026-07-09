import { requestOptions } from "./types";
import { ApiUrl } from "./constants";

export async function sendRequest(options: requestOptions) {

    console.log(ApiUrl);

console.log({
    headers: {
        authorizer: options.publicKey
    }
});
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