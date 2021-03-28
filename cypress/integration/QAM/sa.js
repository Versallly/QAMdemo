describe('Create mark - unmark as favorite', function(){
    it('Login', function(){
        cy.visit('http://paramount-demo.frogslayerdev.com');
        cy.title().should('eq', 'Login - Paramount & Co');
        cy.get('input[type="email"]').type('larry.test@frogslayer.com');
        cy.get('input[type="password"]').type('P@ssword1');
        cy.get('.btn').contains('Login').should('be.visible').click();
        cy.contains('Logout').should('be.visible');        
    })
    it('Add project', function(){
        cy.contains('Add Project').click();
        cy.hash().should('include','#!/projects/new');
        cy.get('label').contains('Project Name', {timeout:7000}).should('be.visible');
        cy.get('input[title="This field is required."]').type('Project QA 123');
        cy.get('input[data-bind="value: surveyCost"]').type('500');
        cy.get('input[data-bind="value: travelCost"]').type('1000');
        cy.contains('Save').should('be.enabled').click();
    })
    it('Search the project', function(){
        cy.get('input[id="search"]').type('Project QA 123');
        cy.get('button').contains('Search').click();
        cy.location('hash').should('include','Project%20QA%20123');
        cy.get('h4').contains('Project QA 123').should('be.visible')
    })
    it('Logout', function(){
        cy.contains('Logout').should('be.visible').click();
        cy.hash().should('include','#!/login/');
    })
});