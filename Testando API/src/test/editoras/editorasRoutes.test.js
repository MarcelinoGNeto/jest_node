import { afterEach, beforeEach, describe, expect, jest } from "@jest/globals";
import app from "../../app";
import request from "supertest"

let server;

// Hook para inicializar a conexão/servidor antes dos testes
beforeEach(() => {
    const port = 3000;
    server = app.listen(port);
})

// Hook para derrubar a conexão/servidor após os testes
afterEach(() => {
    server.close();
})

describe('GET em /editoras', () => {
    it('Deve retornar uma lista de editoras', async () => {
        const resposta = await request(app)
            .get('/editoras')
            .set('Accept', 'application/json') // setar paramentros/informações no header
            .expect('content-type', /json/) // resposta da teste no header
            .expect(200) // resposta da requisição da rota
        
        expect(resposta.body[0].email).toEqual('e@e.com') //verificando uma informação do corpo da requisição
    })
})

let idResposta; // usar id dinamico nos testes da rota POST e utiliza-lo no teste da rota DELETE, evitando popular no BD
describe('POST em /editoras', () => {
    it('Deve adicionar uma nova editora', async () => {
        const resposta = await request(app)
            .post('/editoras')
            .send({
                nome: "CDC",
                cidade: "São Paulo",
                email: "c@c.com",
            })
            .expect(201); // espera a resposta com sucesso
        idResposta = resposta.body.content.id;
    })

    // Caso de contorno / beirada
    it('Deve não adicionar nada ao passar body vazio', async () => {
        await request(app)
            .post('/editoras')
            .send({})
            .expect(400)
    })
})

describe('GET pega editora por id /editoras/id', () => {
    it('deve retornar recurso selecionado', async () => {
        await request(app)
            .get(`/editoras/${idResposta}`)
            .expect(200) // espera a resposta com sucesso
    })
})

describe('PUT em /editoras/id', () => {
    // each roda cada um dos testes separado
    it.each([
        ['nome', {nome: 'Casa do Código'}], // 1
        ['cidade', {cidade: 'SP'}], // 2
        ['email', {email: 'cdc@cdc'}], // 3
    ])('Deve alterar o campo %s', async (param) => {
        //spyOn: cria um espião para verificar os métodos do objeto
        const requisicao = { request };
        const spy = jest.spyOn(requisicao, 'request')
        await requisicao.request(app)
            .put(`/editoras/${idResposta}`)
            .send(param)
            .expect(204);

        expect(spy).toHaveBeenCalled();
    })
})

describe('DELETE em /editoras/id', () => {
    it('Deletar o recurso adicionado pela rota de POST', async () => {
        await request(app)
            .delete(`/editoras/${idResposta}`)
            .expect(200) // espera a resposta com sucesso
    })
})
