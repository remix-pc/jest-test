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
            throw new Error(error)
        })
    })


    test("Deve impedir que um usuário se cadastre com os dados vazios", () => {

        let user = {name: "", email: "", password: ""}


        return request.post("/user").send(user).then(res => {

        
            expect(res.statusCode).toEqual(400) //Bad Request
            
        
        }).catch(error => {
            throw new Error(error)
        })

    })


    test("Deve impedir que um usuário se cadastre com um e-mail repetido", () => {

        let time = Date.now()
        let email = `${time}@gmail.com  `
        let user = {name: "Guilherme", email: email, password: "1232"}


        return request.post("/user").send(user).then(res => {

            expect(res.statusCode).toEqual(200)
            expect(res.body.email).toEqual(email)


            return request.post("/user").send(user).then(res => {

                expect(res.statusCode).toEqual(400)
                expect(res.body.error).toEqual("E-mail já cadastrado")

            }).catch(error =>{
                throw new Error(error)
            })

        }).catch(error => {
            throw new Error(error)
        })

    })

})