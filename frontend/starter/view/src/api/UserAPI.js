const baseUrl = import.meta.env.VITE_API_BASE_URL;
import {delay} from "../../../utils/delay";

class UserApi {
    async login(email, password) {
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) throw new Error('Bad credentials');
        return response.json();
    }

    async register(userData) {

        userData = {
            "username": "coolcat92",
            "email": "coolcat92@example.com",
            "password": "P@ssw0rd123!",
            "phoneNumber": "+1-202-555-0173",
            "country": "United States",
            "birthDate": "1992-07-15",
            "name": "Alexandra",
            "surname": "Smith",
            "city": "San Francisco"
        }

        await delay(500)

        return userData
        //
        // const {
        //     username,
        //     email,
        //     password,
        //     phoneNumber,
        //     country,
        //     birthDate,
        //     fullName,
        //     city,
        // } = userData;
        //
        // const response = await fetch(`${baseUrl}/users`, {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         username,
        //         email,
        //         password,
        //         phoneNumber,
        //         country,
        //         birthDate,
        //         fullName,
        //         city,
        //     }),
        // });
        // if (!response.ok) throw new Error('Registration failed');
        // return response.json();



    }
}

export const userApi = new UserApi();
