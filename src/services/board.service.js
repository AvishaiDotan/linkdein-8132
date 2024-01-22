import { post , put, setAuthToken, get} from './http.service'
const apiUrl = 'board';



async function read() {
    try {
        setAuthToken()
        return await get(apiUrl)

    } catch (error) {
        throw error;
    }
}


export { read };