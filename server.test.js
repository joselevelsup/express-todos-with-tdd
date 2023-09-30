const request = require("supertest");
const app = require("./server");

describe("Todo Routes", () => {
  describe("GET /", () => {
    //Write this test up first
    it("responds with an OK status", async () => {
      const response = await request(app).get("/"); //Makes a request to the server
      expect(response.status).toBe(200); //Checks to see if the status is a 200
    });
  });

  describe("POST /todo", () => {
    it("responds with a create status", async () => {
      const response = await request(app).post("/todo").send({
        todo: "Make cookies",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("success", true); //Checks if the body has the property of success and the value is equal to true
    });
  });

  describe("GET /todo/:id", () => {
    it("Should fail with a 401 status code", async () => {
      const response = await request(app).get("/todo/1");

      expect(response.status).toBe(401);
    });
  });
});
