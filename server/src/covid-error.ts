import { ERROR_MESSAGES, SERVER_STATUS } from "./constants";

export class CovidError extends Error {
    createCovidError() {
        const covidError = {
            message: ERROR_MESSAGES.INTERNAL_ERROR,
            statusCode: SERVER_STATUS.INTERNAL_ERROR
        }
        return covidError;
    }
}