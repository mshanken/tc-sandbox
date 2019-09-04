describe('Simple test', () => {
  it('has "Hello world"', () => {
    cy.visit('/');

    cy.contains('Hello world');
  });
});
