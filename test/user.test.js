let app = require("../src/app")
let supertest = require('supertest')
let request  = supertest(app)

let mainUser = {name: "Guilherme Silva", email: "guilherme.silva@gmail.com", password: "123456"}


beforeAll(() => { // Gloabais do Jest

    //Inserir usuário Guilherme no Banco
    return request.post("/user").send(mainUser).then(res =>{}).catch(error => {console.log(error)})
})

afterAll(() => {
    //Remover Guilherme do Banco
    return request.delete(`/user/${mainUser.email}`).then(res => {}).catch(error => {console.log(error)})
})




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


describe("Autenticação", () => {
    test("Deve me retornar um token quando logar", () => {
        return request.post('/auth').send({email: mainUser.email, password: mainUser.password}).then(res => {   
            expect(res.statusCode).toEqual(200)
            expect(res.body.token).toBeDefined()
        }).catch(error => {
            throw new Error(error)
        })
    })


    test("Deve impedir que um usuário não cadastrado se logue",() => {

        return request.post('/auth').send({email: "umemailqualquer@ahshasa", password: "3324224224424252"}).then(res => {   
            expect(res.statusCode).toEqual(403  )
            expect(res.body.errors.email).toEqual("E-mail não cadastrado")
        }).catch(error => {
            throw new Error(error)
        })
    })


    test("Deve impedir que um usuário se logue com uma senha errada", () => {

        return request.post('/auth').send({email: mainUser.email , password: "3324224224424252"}).then(res => {   
            expect(res.statusCode).toEqual(403  )
            expect(res.body.errors.password).toEqual("Senha incorreta")
        }).catch(error => {
            throw new Error(error)
        })
        
    })


})