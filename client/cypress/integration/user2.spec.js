describe("USER 2", () => {
  beforeEach(() => {
    cy.login({ email: "test2@test.com", password: "12345678" });
  });

  it("join to chat", () => {
    cy.joinChat({ name: "Test Group" });
  });

  it("send message to group", () => {
    cy.sendMessage({ group: "Test Group", message: "Message{enter}" });
  });

  it("leave to chat", () => {
    cy.joinChat({ name: "Test Group" });
    cy.openDetailsGroup();
    cy.get('[data-test-id="details-group-button"]').click();
  });

  it("DELETE ALL", () => {
    cy.deleteDatabase();
  });
});
