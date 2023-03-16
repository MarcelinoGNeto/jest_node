import Item from '../item.js';

describe('Teste dos itens', () => {
  it('Deve ter 3 campos: nome, valor e quantidade', () => {
    // estanciando um item de acordo como a classe espera 'nome, valor e quantidade'
    const item = new Item('Beterraba', 2.5, 10);

    expect(item.nome).toBe('Beterraba');
    expect(item.valor).toBe(2.5);
    expect(item.quantidade).toBe(10);
  });

  // testa o método/função da classe Item 'pegaValorTotalItem()'
  it('Deve ter o preço calculado de acordo com a quantidade através da função pegaValorTotalItem()', () => {
    const item = new Item('Batata', 0.1, 3);

    // expect(item.pegaValorTotalItem()).toBe(50); // toBe - tem que ser igual
    expect(item.pegaValorTotalItem()).toBeCloseTo(0.3); // toBeCloseTo - 'próximo a' para casos de ponto flutuante 0.30000
  });
});
