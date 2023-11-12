describe("USER 1", () => {
  beforeEach(() => {
    cy.login({ email: "test1@test.com", password: "12345678" });
  });

  it("create accounts and login", () => {
    cy.register({
      name: "User_Test_1",
      email: "test1@test.com",
      password: "12345678",
    });
    cy.register({
      name: "User_Test_2",
      email: "test2@test.com",
      password: "12345678",
    });
    cy.register({
      name: "User_Test_3",
      email: "test3@test.com",
      password: "12345678",
    });
  });

  it("create a group", () => {
    cy.goNavUser(1);
    cy.get('[name="name"]').type("Test Group");
    cy.get('form button[type="submit"]').click();
    cy.wait(2000);
  });

  it("join to chat", () => {
    cy.joinChat({ name: "Test Group" });
  });

  it("send message to group", () => {
    cy.sendMessage({ group: "Test Group", message: "Message{enter}" });
  });

  it("add user to group", () => {
    cy.joinChat({ name: "Test Group" });
    cy.openDetailsGroup();
    cy.get(
      `[data-test-id="participants-form"] div button[title="Agregar"]`
    ).click({ multiple: true });
    cy.get('button[type="submit"]').click();
  });

  it("set and remove admin and remove to chat", () => {
    cy.joinChat({ name: "Test Group" });
    cy.openDetailsGroup();
    cy.get('[data-test-id="details_group"]').within(() => {
      cy.get(
        '[data-test-id="participants-list"] div:nth-child(2) div:nth-child(2) button[data-test-id="set_admin"]'
      )
        .should("be.visible")
        .click();
      cy.get(
        '[data-test-id="participants-list"] div:nth-child(2) div:nth-child(2) button[data-test-id="remove_admin"]'
      )
        .should("be.visible")
        .click();
      cy.get(
        '[data-test-id="participants-list"] div:nth-child(3) div:nth-child(2) button[data-test-id="remove_user"]'
      )
        .should("be.visible")
        .click({ force: true });
    });
  });

  it("user profile actions", () => {
    cy.goNavUser(2);
    cy.get('[data-test-id="button-input-name"]').click();
    cy.get('[data-test-id="input-name"]').type("User_Test_1_");
    cy.get('[data-test-id="button-input-bio"]').click();
    cy.get('[data-test-id="input-bio"]').type("New bio");
    cy.get("button").contains("Guardar").click();
    cy.wait(1000);

    cy.goNavUser(2);
    cy.get('[data-test-id="input-name-p"]').should("contain", "User_Test_1_");
  });

  it("change background", () => {
    cy.goNavUser(3);
    cy.get('[data-test-id="background-images"] button:nth-child(2)').click();
    cy.get('[data-test-id="button-background-images"]').click();

    cy.goNavUser(3);
    cy.get('[data-test-id="preview-background-image"]')
      .invoke("attr", "alt")
      .should("eq", "image-2.png");
  });

  it("logout", () => {
    cy.get('[data-test-id="user-nav-options"]').should("be.visible").click();
    cy.get(`#headlessui-menu-items-2 button:nth-child(4)`).click();
    cy.get('[data-test-id="login-div"]').should("be.visible");
  });
});
