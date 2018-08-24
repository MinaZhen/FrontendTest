"use strict"

/**
 * Object that calls to GitHub Api and return errors or data objects
 */
const logic = {
    url: "https://api.github.com",
    token: "TOKEN",

    headers() {
        return { headers: { Authorization: `Bearer ${this.token}` } }
    },

    /**
     * Calls the Api to retrieve the user information
     * 
     * @param {string} username 
     * 
     * @throws Status error and message
     * 
     * @returns {Object} - User information
     */
    findUser(username) {
        return Promise.resolve()

            .then(() => {

                if (typeof username !== "string") throw new Error ("Username is not a string")

                return fetch(`${this.url}/users/${username}`, this.headers())
                    .then(resp => resp.json())
                    .then(data => data)
                    .catch(err => err)
            })
    },

    /**
     * Calls the Api to get the user repositories
     * 
     * @param {string} username 
     * 
     * @throws Error
     * 
     * @returns {Array<Object>} - User information
     */
    showRepos(username) {
        return Promise.resolve()

            .then(() => {

                if (typeof username !== "string") throw new Error ("Username is not a string")
                
                return fetch(`${this.url}/users/${username}/repos`, this.headers())
                    .then(resp => resp.json())
                    .then(data => data)
                    .catch(err => err)
            })
    }
}