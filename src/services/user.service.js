import { post , put, setAuthToken} from './http.service'
import { getLocalStorage, setLocalStorage } from './localStorage.service'
const apiUrl = 'authenticate';
const userKey = "linkedin8132user"
const cookieKey = "linkedin8132cookie"
function isThereUser() {
    return getLocalStorage(userKey)
}

function getCookie() {
    return getLocalStorage(cookieKey)
}


async function login(userId, password) {
    try {
        var { cleanUser, token } = await post("login", { userId, password })
        setLocalStorage(userKey, {
            cleanUser,
        })
        setLocalStorage(cookieKey, {
            token,
        })
        return true;
    } catch (error) {
        throw error;
    }
}

async function putUser(user) {
    try {
        setAuthToken()
        await put("user", { user })
        return true;
    } catch (error) {
        throw error;
    }
}

async function authenticateUser() {
    try {
        var cookie = getCookie()
        var { isValid } = await post("validateToken", { token: cookie?.token })

        return isValid;
    } catch (error) {
        throw error;
    }
}


export { authenticateUser, isThereUser, login, putUser };