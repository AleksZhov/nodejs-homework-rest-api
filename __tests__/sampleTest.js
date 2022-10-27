const request = require("supertest");

const app = require("../app");

describe("Signup controller test", () => {
  test("Test login route", async () => {
    const newUserLoginData = {
      email: "san@gmail.com",
      password: "111111",
    };

    const response = await request(app)
      .post("/api/users/login")
      .set("Content-Type", "application/json")
      .send(newUserLoginData);
    console.log(response);
    expect(response.statusCode).toBe(200);
  });
});
