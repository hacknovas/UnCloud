import { Client, Account, ID } from "appwrite";

export const client = new Client()

client.setEndpoint(process.env.REACT_APP_APPWRITE_URL)
    .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

export const account = new Account(this.client);

  async  function createAccount({ email, password, name }) {
        try {
            const userAccount = await account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    function login({ email, password }) {
            return account.createEmailSession(email, password);
    }

    function getCurrentUser() {
        return account.get()
    }

    function logout() {
        return account.deleteSessions();
    }


export {login,logout,getCurrentUser,createAccount}

