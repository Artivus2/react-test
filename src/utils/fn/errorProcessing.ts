import axios from "axios";

export const errorProcessing = (error: unknown) => {

    let errorMessage = 'Some error.';
    if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message
            ? error.response.data.message
            : error.message;

    } else if (error instanceof ReferenceError) {
        errorMessage = error.message;
    }
    return errorMessage;
};