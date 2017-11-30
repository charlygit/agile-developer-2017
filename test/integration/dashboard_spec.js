describe('Dashboard', function() {
    it('displays the open issues count', function(){
        cy.resetDB();
        cy.fixture({
            status: 'open',
            severity: 'High'
        });
        cy.fixture({
            status: 'open',
            severity: 'High'
        });
        cy.fixture({
            status: 'closed',
            severity: 'Medium'
        });
        cy.visit('/dashboard');

        
        cy.get('[data-test-open-issues]').should('contain','2 open issues');
        cy.dataTest('high-gauge').should('exist').should('contain','100');

        cy.dataTest('add-issue').click();
        cy.field('title').type('New issue');
        cy.field('description').type('New issue description');
        cy.field('severity').select('Medium');
        cy.field('estimation').select('8');
        cy.get('[type=submit]').click();

        cy.visit('/dashboard');
        cy.get('[data-test-open-issues]').should('contain','3 open issues');
        cy.dataTest('high-gauge').should('exist').should('contain','67');

    });
});
