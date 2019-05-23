describe('Testen op verwijderen', function () {
    it('Alle posts van de user kunnen verwijderd worden en het aantal is dan ook 0', function() {
     
      cy.server();
      cy.visit('/login');
      cy.get('[data-cy=login-email]').type('student@hogent.be');
      cy.get('[data-cy=login-password]').clear();
      cy.get('[data-cy=login-password]').type('P@ssword1111');
      cy.get('[data-cy=login-button]').click();
      cy.get('[data-cy=fotoToevoegen]').click();
      cy.url().should('include', '/add-post')
      cy.get('[data-cy=caption]').type('Een tekst voor de caption');
      cy.get('[data-cy=deelKnop]').click();
      cy.url().should('include', '/post-list')
      
      cy.get('[data-cy=profielButton]').click();
    
      cy.get('[data-cy=verwijderButton]').click({multiple:true, force:true});
      cy.get('[data-cy=userPosts]').should('have.length',0);
    
    
      
     
    });});