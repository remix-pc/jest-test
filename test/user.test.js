let app = require("../src/app")
let supertest = require('supertest')
let request  = supertest(app)


describe("Cadastro de Usuário", () => {

    test("Deve cadastrar um usuário com sucesso", () => {

        let time = Date.now()
        let email = `${time}@gmail.com  `
        let user = {name: "Guilherme", email: email, password: "1232"}


        return request.post("/user").send(user).then(res => {

            expect(res.statusCode).toEqual(200)
            expect(res.body.email).toEqual(email)

        }).catch(error => {

            fail(error)

        })


    })


})