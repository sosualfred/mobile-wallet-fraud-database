import {apiClient} from  "./config"


// login
export const apiLogin = async (payload) => {
    return apiClient.post("/api/admin/login",payload)
}