import TransportGuruApi from '../../Api/TransportGuruApi'

const SENDEMAIL_FULFILLED = "SENDEMAIL_FULFILLED"
const SENDEMAIL_PENDING = "SENDEMAIL_PENDING"
const SENDEMAIL_REJECTED = "SENDEMAIL_REJECTED"

const SENDSMS_FULFILLED = "SENDSMS_FULFILLED"
const SENDSMS_PENDING = "SENDSMS_PENDING"
const SENDSMS_REJECTED = "SENDSMS_REJECTED"

const VERIFYEMAIL_FULFILLED = "VERIFYEMAIL_FULFILLED"
const VERIFYEMAIL_PENDING = "VERIFYEMAIL_PENDING"
const VERIFYEMAIL_REJECTED = "VERIFYEMAIL_REJECTED"

const VERIFYMOBILENO_FULFILLED = "VERIFYMOBILENO_FULFILLED"
const VERIFYMOBILENO_PENDING = "VERIFYMOBILENO_PENDING"
const VERIFYMOBILENO_REJECTED = "VERIFYMOBILENO_REJECTED"
export const sendEmail = (email) => async (dispatch) => {
    try {
        dispatch({ type: SENDEMAIL_PENDING })
        const response = await TransportGuruApi.post('/sendemail', { email: email });
        dispatch({ type: SENDEMAIL_FULFILLED, payload: response.data })
    } catch (e) {
        dispatch({ type: SENDEMAIL_REJECTED, payload: e.response.data })
    }
}
export const sendSms = (mobileno) => async (dispatch) => {
    try {
        dispatch({ type: SENDSMS_PENDING })
        const response = await TransportGuruApi.post('/sendsms', { mobileno: mobileno });
        dispatch({ type: SENDSMS_FULFILLED, payload: response.data })
    } catch (e) {
        dispatch({ type: SENDSMS_REJECTED, payload: e.response.data })
    }
}
export const verifyemail = (obj) => async (dispatch) => {
    try {
        dispatch({ type: VERIFYEMAIL_PENDING })
        const response = await TransportGuruApi.post('/verifyuser', obj);
        dispatch({ type: VERIFYEMAIL_FULFILLED, payload: response.data })
    } catch (e) {
        dispatch({ type: VERIFYEMAIL_REJECTED, payload: e.response.data })
    }
}
export const verifyMobileNo = (obj) => async (dispatch) => {
    try {
        dispatch({ type: VERIFYMOBILENO_PENDING })
        const response = await TransportGuruApi.post('/verifySmsUser', obj);
        dispatch({ type: VERIFYMOBILENO_FULFILLED, payload: response.data })
    } catch (e) {
        dispatch({ type: VERIFYMOBILENO_REJECTED, payload: e.response.data })
    }
}

