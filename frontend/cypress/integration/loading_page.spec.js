describe("Loading page",()=>{
  it("should load the page",()=>{
    cy.visit("https://nextjs-whatsapp-clone-aguzzdev.vercel.app/")
    cy.contains("WhatsApp")
  })
})