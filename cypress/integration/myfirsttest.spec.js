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
  it('De gebruiker logt met correcte gegevens en de get request mock response geeft 1 post terug', function() {
    cy.server();
    cy.route({
      method: 'GET',
      status:200,
      url: '/api/posts',
      response: 'fixture:posts.json' 
    });
    cy.visit('/login');
    cy.get('[data-cy=login-email]').clear();
    cy.get('[data-cy=login-email]').type('student@hogent.be');
    cy.get('[data-cy=login-password]').clear();
    cy.get('[data-cy=login-password]').type('P@ssword1111');
    cy.get('[data-cy=login-button]').click();
  
    cy.get('[data-cy=postCard]').should('have.length',1);
    
   
  });
  it('De gebruiker logt met correcte gegevens in en bevind zich op de post-list pagina', function() {
    cy.server();
    cy.route({
      method: 'GET',
      status:200,
      url: '*/posts*',
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
  it('Foto toevoegen button navigeert naar add-post component', function() {
 
    /*INLOGGEN*/
    cy.server();
    cy.visit('/login');
    cy.get('[data-cy=login-email]').type('student@hogent.be');
    cy.get('[data-cy=login-password]').clear();
    cy.get('[data-cy=login-password]').type('P@ssword1111');
    cy.get('[data-cy=login-button]').click();
  


    cy.get('[data-cy=fotoToevoegen]').click();
    cy.url().should('include', '/add-post')



    
   
  });
  it('Een post werd gemaakt met caption (zonder foto)', function() {
 
    /*INLOGGEN*/
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
    


    
   
  });
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
  
    cy.get('[data-cy=verwijderButton]').click({force:true,multiple:true});
    cy.get('[data-cy=userPosts]').should('have.length',0);
  
  
    
   
  });
  it('Uitloggen navigeert naar loginscherm', function() {
     
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
    
    cy.get('[data-cy=logoutKnop]').click();
  
    cy.url().should('include', '/login')
   
  
    
   
  });

  
});


