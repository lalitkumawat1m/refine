/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-material-ui-use-delete-many", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173");
    });

    it("should be view list page", () => {
        cy.resourceList();
    });

    it("should select all rows when click the checkbox in the table header", () => {
        cy.getMaterialUILoadingCircular().should("exist");
        cy.getMaterialUILoadingCircular().should("not.exist");

        cy.get(
            ".MuiDataGrid-columnHeaderTitleContainer .MuiCheckbox-root",
        ).click();

        cy.get(".MuiDataGrid-virtualScrollerContent .MuiCheckbox-root").each(
            (checkbox) => {
                expect(checkbox).to.have.class("Mui-checked");
            },
        );
    });

    it("delete button should be disabled when no row is selected", () => {
        cy.getMaterialUILoadingCircular().should("exist");
        cy.getMaterialUILoadingCircular().should("not.exist");

        cy.get("#delete-selected").eq(0).should("be.disabled");
    });

    it("should be able to delete all selected rows", () => {
        cy.getMaterialUILoadingCircular().should("exist");
        cy.getMaterialUILoadingCircular().should("not.exist");

        cy.get(".MuiDataGrid-row").eq(0).children().eq(0).click();
        cy.get(".MuiDataGrid-row").eq(1).children().eq(0).click();

        cy.get(".MuiDataGrid-virtualScrollerContent .Mui-checked").should(
            "have.length",
            2,
        );

        cy.interceptDELETEPost();

        cy.get("#delete-selected").click();

        cy.wait("@deletePost");
        cy.wait("@deletePost");
    });
});
