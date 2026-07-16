import { getCurrentUser } from "../api/api";

class AuthService {

    async getUser() {

        try {

            const response = await getCurrentUser();

            return response.data;

        }

        catch (err) {

            return null;

        }

    }

    logout() {

        localStorage.removeItem("token");

        window.location.href="/";

    }

}

export default new AuthService();