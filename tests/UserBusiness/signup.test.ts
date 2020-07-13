// ○ Teste 1: Erro que deve retornar quando o nome está vazio OK
// ○ Teste 2: Erro que deve retornar quando o email está vazio Ok
// ○ Teste 2: Erro que deve retornar quando o nickname está vazio Ok
// ○ Teste 3: Erro que deve retornar quando a senha está vazia
// ○ Teste 4: Erro que deve retornar quando o tipo de usuário está vazio
// ○ Teste 5: Erro que deve retornar quando o email está incorreto
// ○ Teste 6: Erro que deve retornar quando a senha está errada
// ○ Teste 7: Erro que deve retornar quando o tipo de usuário está errado
// ○ Teste 8: Sucesso no cadastro e verificação do token de acesso

import { UserBusiness } from "../../src/business/UserBusiness";
import { User, UserRole } from "../../src/Model/UserModel";

describe("Testing UserBusines - signup", () => {

    let userDatabase = {};
    let hashGenerator = {};
    let auth = {};
    let idGenerator = {};

    test("Should return 'Missing input' from empty name", async() => {
        expect.assertions(2)

        try {

            const userBusiness = new UserBusiness (
                userDatabase as any,
                hashGenerator as any,
                auth as any,
                idGenerator as any

            );

            await userBusiness.signup(
                "", 
                "teste@labenu.com", 
                "testinho",
                "teste12345",
                "admin"
            );
        } catch(error) {

            expect(error.errorCode).toBe(422);
            expect(error.message).toBe("Missing input");
        }

     });

    test("Should return 'Missing input' for empty email", async() => {
        expect.assertions(2)

        try {

            const userBusiness = new UserBusiness (
                userDatabase as any,
                hashGenerator as any,
                auth as any,
                idGenerator as any
            );

            await userBusiness.signup(
                "Sr Teste",
                "",
                "testinho",
                "testeteste",
                "admin"
            );

        } catch(error) {

            expect(error.errorCode).toBe(422);
            expect(error.message).toBe("Missing input")
        }

    });

    test("Should return 'Missing input' for empty nickname", async() => {
        expect.assertions(2)

        try{

            const userBusiness = new UserBusiness (

                userDatabase as any,
                hashGenerator as any,
                auth as any,
                idGenerator as any
            );
            await userBusiness.signup(
                "Tompero",
                "tompero@labenu.com",
                "",
                "1234567890",
                "banda",
                "uma banda felina"
            );
            
            
        } catch(err) {

            expect(err.errorCode).toBe(422);
            expect(err.message).toBe("Missing input")
        }
    })


    // afterAll(async() => {

        
    // })

})