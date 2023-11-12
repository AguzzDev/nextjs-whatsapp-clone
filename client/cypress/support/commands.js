Cypress.Commands.add("login", ({ email, password }) => {
  cy.visit("/");
  cy.get('[data-test-id="login-div"]').should("be.visible");
  cy.get('[name="email"]').type(email);
  cy.get('[name="password"]').type(password);
  cy.contains("Entrar").click();
});

Cypress.Commands.add("goNavUser", (children) => {
  cy.get('[data-test-id="user-nav-options"]').should("be.visible").click();
  cy.get(`#headlessui-menu-items-2 button:nth-child(${children})`).click();
  cy.get('[data-test-id="sidebar-container"]').should("be.visible");
});

Cypress.Commands.add("openDetailsGroup", () => {
  cy.get('[data-test-id="open_details_group"]').click();
  cy.wait(1000);
});

Cypress.Commands.add("joinChat", ({ name }) => {
  cy.contains(name).should("be.visible").click();
  cy.get('[data-test-id="name-group"]').should("be.visible").contains(name);
});

Cypress.Commands.add("sendMessage", ({ group, message }) => {
  cy.joinChat({ name: group });
  cy.get('[data-test-id="message-form"] input').type(message);
});

Cypress.Commands.add("deleteDatabase", () => {
  cy.visit("/");
  cy.request({
    method: "POST",
    url: "http://localhost:4000/graphql",
    body: {
      query: `
            mutation ResetDatabase{
                resetDatabase 
            }
            `,
    },
  });
});

Cypress.Commands.add("register", ({ name, email, password }) => {
  cy.request({
    method: "POST",
    url: "http://localhost:4000/graphql",
    body: {
      query: `
      mutation Register($name: String!, $email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password) {
          user {
            id
          }
          errors {
            field
            message
          }
        }
      }
      `,
      variables: {
        name,
        email,
        password,
      },
    },
  });
});
