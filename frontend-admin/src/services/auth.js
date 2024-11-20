import {apiClient} from  "./config"


// registration
export const apiSignup = async (payload) => {
    return await apiClient.post("/auth/register",payload)
}
// login
export const apiLogin = async (payload) => {
    return apiClient.post("/api/admin/login",payload)
}