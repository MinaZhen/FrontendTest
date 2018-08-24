"use strict";

describe("logic (frontend test)", () => {

    describe("find user", () => {

        it("should return a object with user information", done => {
            logic.findUser("minazhen")
            .then(myself => {

                expect(myself instanceof Object).toBeTruthy()

                expect(myself.name).toBe("Mina Zhen")
                expect(myself.login).toBe("MinaZhen")

                done()
            })
            
        });


        it("should return error if user doesn't exist", done => {
            logic.findUser("asd asd")
            .then(err => {
                expect(err).toBeDefined()
                expect(err.message).toBe("Not Found")

                done()
            })
        })

        it("should return error if token is not valid", done => {
            let goodToken = logic.token
            logic.token = "asd"

            logic.findUser("asd asd")
            .then(err => {
                expect(err).toBeDefined()
                expect(err.message).toBe("Bad credentials")

                logic.token = goodToken
                done()
            })
        })

        it("should throw error if username is not a string", done => {
            logic.findUser(["1"])
            .catch(err => {
                expect(err).toBeDefined()
                expect(err.message).toBe("Username is not a string")

                done()
            })
        })
    })

    describe("find repositories", () => {

        it("should return an array with repositories information", done => {
            logic.showRepos("minazhen")
            .then(repos => {

                expect(Array.isArray(repos)).toBeTruthy()

                expect(repos.length).toBe(7)
                expect(repos[0].name).toBe("a-last")

                done()
            })
            
        });

        it("should return an empty array if has not repositories", done => {
            logic.showRepos("asdasdasdasd")
            .then(repos => {

                expect(Array.isArray(repos)).toBeTruthy()

                expect(repos.length).toBe(0)

                done()
            })
            
        });


        it("should return error if user doesn't exist", done => {
            logic.showRepos("asd asd")
            .then(err => {
                expect(err).toBeDefined()
                expect(err.message).toBe("Not Found")

                done()
            })
        })

        it("should return error if token is not valid", done => {
            let goodToken = logic.token
            logic.token = "asd"

            logic.showRepos("minazhen")
            .then(err => {
                expect(err).toBeDefined()
                expect(err.message).toBe("Bad credentials")

                logic.token = goodToken
                done()
            })
        })

        it("should throw error if username is not a string", done => {
            logic.showRepos()
            .catch(err => {
                expect(err).toBeDefined()
                expect(err.message).toBe("Username is not a string")

                done()
            })
        })
    })

})