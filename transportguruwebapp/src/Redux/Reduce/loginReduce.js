const SENDEMAIL_FULFILLED = "SENDEMAIL_FULFILLED"
const SENDEMAIL_PENDING = "SENDEMAIL_PENDING"
const SENDEMAIL_REJECTED = "SENDEMAIL_REJECTED"

const LOGIN_RESET = "LOGIN_RESET"

const SENDSMS_FULFILLED = "SENDSMS_FULFILLED"
const SENDSMS_PENDING = "SENDSMS_PENDING"
const SENDSMS_REJECTED = "SENDSMS_REJECTED"

const VERIFYEMAIL_FULFILLED = "VERIFYEMAIL_FULFILLED"
const VERIFYEMAIL_PENDING = "VERIFYEMAIL_PENDING"
const VERIFYEMAIL_REJECTED = "VERIFYEMAIL_REJECTED"

const VERIFYMOBILENO_FULFILLED = "VERIFYMOBILENO_FULFILLED"
const VERIFYMOBILENO_PENDING = "VERIFYMOBILENO_PENDING"
const VERIFYMOBILENO_REJECTED = "VERIFYMOBILENO_REJECTED"

const initialState = {
    otpData: {},
    loading: false,
    error: ''
}
export const loginReduce = (state = initialState, action) => {
    switch (action.type) {
        case SENDEMAIL_FULFILLED:
            state.loading = false;
            state.otpData = action.payload;
            return { ...state }
        case SENDEMAIL_PENDING:
            state.loading = true;
            return { ...state }
        case SENDEMAIL_REJECTED:
            state.loading = false;
            state.error = action.payload;
            return { ...state }
        case SENDSMS_FULFILLED:
            state.loading = false;
            state.otpData = action.payload;
            return { ...state }
        case SENDSMS_PENDING:
            state.loading = true;
            return { ...state }
        case SENDSMS_REJECTED:
            state.loading = false;
            state.error = action.payload;
            return { ...state }
        case VERIFYEMAIL_FULFILLED:
            state.loading = false;
            state.otpData = action.payload;
            localStorage.setItem("@token", action.payload.token)
            return { ...state }
        case VERIFYEMAIL_PENDING:
            state.loading = true;
            return { ...state }
        case VERIFYEMAIL_REJECTED:
            state.loading = false;
            state.error = action.payload;
            return { ...state }
        case VERIFYMOBILENO_FULFILLED:
            state.loading = false;
            state.otpData = action.payload;
            localStorage.setItem("@token", action.payload.token)
            return { ...state }
        case VERIFYMOBILENO_PENDING:
            state.loading = true;
            return { ...state }
        case VERIFYMOBILENO_REJECTED:
            state.loading = false;
            state.error = action.payload;
            return { ...state }
        case LOGIN_RESET:
            return { ...initialState }
        default:
            return { ...state }
    }
}