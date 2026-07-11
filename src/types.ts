export interface SubmitFormOptions {
    publicKey: string;
    formData: FormData | Record<string, FormDataEntryValue>;
}

export interface requestOptions{
    publicKey: string;
    Data: Record<string, any>;
}