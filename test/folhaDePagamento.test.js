import { calculaDescontos, somaHorasExtras } from '../index.js';

// Descreve o que faz o conjunto de testes
describe('Teste dos calculos da folha de pagamento', () => {
  // test - it 'Isso...'
  it('Deve retornar soma das horas extras', () => {
    const esperado = 2500;
    const retornado = somaHorasExtras(2000, 500);

    // expect 'espera(do)' | toBe - 'seja' : Espera que o retorno seja igual ao esperado
    expect(retornado).toBe(esperado);
  });

  it('Deve descontar o valor do salario', () => {
    const esperado = 2100;
    const retornado = calculaDescontos(2500, 400);

    expect(retornado).toBe(esperado);
  });
});
