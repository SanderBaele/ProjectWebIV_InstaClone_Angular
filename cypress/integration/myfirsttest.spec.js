import { createYield } from "typescript";

describe('Alle testen', function () {
  it('De app runt', function () {

    cy.visit('')
    
 

  });
  it('De posts kunnen opgehaald worden', function() {
    cy.server(
     
    );
    cy.route({
      method: 'GET',
      url: 'https://localhost:44393/api/posts'
     
    });
  
  });
  it('De gebruiker logt met correcte gegevens in en bevind zich op de post-list pagina', function() {
    cy.server();
    cy.route({
      method: 'GET',
      status:200,
      url: 'https://localhost:44393/api/posts',
      response: [{id:2, caption:'De verwachte caption'}]   
    });
    cy.visit('/login');
    cy.get('[data-cy=login-email]').clear();
    cy.get('[data-cy=login-email]').type('student@hogent.be');
    cy.get('[data-cy=login-password]').clear();
    cy.get('[data-cy=login-password]').type('P@ssword1111');
    cy.get('[data-cy=login-button]').click();
   
    cy.url().should('include', '/post-list')
    
   /* cy.get('[data-cy=postCard]').should('have.length',1);*/
  });
  it('De gebruiker logt met correcte gegevens en de get request krijgt 2 posts binnen', function() {
    cy.server();
    cy.route({
      method: 'GET',
      status:200,
      url: 'https://localhost:44393/api/posts',
      response: [{id:2, caption:'De verwachte caption'}]   
    });
    cy.visit('/login');
    cy.get('[data-cy=login-email]').clear();
    cy.get('[data-cy=login-email]').type('student@hogent.be');
    cy.get('[data-cy=login-password]').clear();
    cy.get('[data-cy=login-password]').type('P@ssword1111');
    cy.get('[data-cy=login-button]').click();
  
    cy.get('[data-cy=postCard]').should('have.length',2);
    
   /* cy.get('[data-cy=postCard]').should('have.length',1);*/
  });
  it('Op naam klikken in navbar navigeert naar profiel', function() {
 
    /*INLOGGEN*/
    cy.server();
    cy.visit('/login');
    cy.get('[data-cy=login-email]').type('student@hogent.be');
    cy.get('[data-cy=login-password]').clear();
    cy.get('[data-cy=login-password]').type('P@ssword1111');
    cy.get('[data-cy=login-button]').click();
  


    cy.get('[data-cy=profielButton]').click();
    cy.url().should('include', '/profiel')



    
   
  });
 /* it('Op naam klikken in navbar navigeert naar profiel', function() {
 
    /*INLOGGEN
    cy.server();
    cy.visit('/login');
    cy.get('[data-cy=login-email]').type('student@hogent.be');
    cy.get('[data-cy=login-password]').clear();
    cy.get('[data-cy=login-password]').type('P@ssword1111');
    cy.get('[data-cy=login-button]').click();
  


    cy.get('[data-cy=profielButton]').click();
    cy.url().should('include', '/profiel')



    
   
  });*/

  /*  it('filter works', function() {
      cy.visit('/');
      cy.get('[data-cy=filterInput]').type('sp');
      cy.get('[data-cy=recipeCard]').should('have.length', 1);
    });
  
    it('mock recipe get', function() {
      cy.server();
      cy.route({
        method: 'GET',
        url: '/api/recipes',
        status: 200,
        response: 'fixture:recipes.json'
      });
  
      cy.visit('/');
      cy.get('[data-cy=recipeCard]').should('have.length', 3);
      cy.get('[data-cy=appError]').should('not.be.visible');
    });
  
    it('on error should show error message', function() {
      cy.server();
      cy.route({
        method: 'GET',
        url: '/api/recipes',
        status: 500,
        response: 'ERROR'
      });
      cy.visit('/');
      cy.get('[data-cy=appError]').should('be.visible');
    });*/
});
