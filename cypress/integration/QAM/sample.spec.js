Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
})

describe('Create mark - unmark as favorite', function(){
    it('Login', function(){
        cy.visit('/');
        cy.title().should('eq', 'Adweek'); 
        cy.get('a[id="subscriber-login"]').contains('Sign In').click();
        cy.get('label').contains('Your email').should('be.visible');
        cy.get('input[name="aw_login_email"]').type('login123456@abc.com');
        cy.get('button').contains('USE PASSWORD').click();
        cy.get('input[id="aw_login_pwd"]').type('login123456');
        cy.get('button[type="submit"]').should('be.visible').click()
        cy.get('p').contains('Your account information was not found. Please try again or click ').should('be.visible');   
    });
});
