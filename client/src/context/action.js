export const loginStart=(userCredentials)=>({
    type:"LOGIN_START"
})

export const loginSucces=(user)=>({
    type:"LOGIN_SUCCESS",
    payload:user
})

export const loginFaliure=()=>({
    type:"LOGIN_FAILURE"
})

export const updateStart=(user)=>({
    type:"UPDATE_START",
    
})

export const updateSucces=(user)=>({
    type:"UPDATE_SUCCESS",
    payload:user
})

export const updateFailure=()=>({
    type:"UPDATE_FAILURE",
    
})