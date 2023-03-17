import { afterEach, beforeEach } from "@jest/globals";
import app from "../../app";

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