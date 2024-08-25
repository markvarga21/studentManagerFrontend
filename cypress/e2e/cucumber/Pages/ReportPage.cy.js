class ReportPage {
    verifyReportPage() {
        cy.get('[data-testid="report-title"]')
            .should('exist')
            .should('have.text', 'Report a problem');
    }
}

const reportPage = new ReportPage();
export default reportPage;