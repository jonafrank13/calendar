describe("Calendar Application", () => {
    it("Load the application properly with functionalities", () => {
      cy.visit("/");

      cy.get("#title-bar .title").should("have.text", "OPEX ANALYTICS MEETING SCHEDULER");

      cy.get("#cal-mon").should("contain.text", new Date().toLocaleDateString({}, {month: "long"}));

      cy.get(".new-evt-btn").click();

      cy.get("#mt-wrapper").should("contain.text", "New Meeting");

      cy.get(".mt-close").click();

      cy.get(".mt-wrapper").should("not.exist");

      cy.get(".lang-icon").click();

      cy.contains("Russian").click();

      cy.get("#title-bar .title").should("have.text", "OPEX аналитика планировщик встреч");

      cy.get(".lang-icon").click();

      cy.contains("English").click();

      cy.get(".search").click();

      cy.get(".sc-wrap input").type("Ga");

      cy.get(".result-text").should("contain.text", "Ga");

      cy.get(".search").click();
    });
});