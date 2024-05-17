import supertest from "supertest";
import { startServer } from "../../server.js";
import { connectionInstance } from "../../db/connection.js";
import { OTP } from "../../models/otp.models.js";
import { User } from "../../models/user.models.js";

let app;

beforeAll(async () => {
  try {
    app = await startServer();
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit the tests if the server fails to start
  }
});

afterAll(async () => {
  await connectionInstance.disconnect();
});

describe("User API", () => {
  describe("register endpoint", () => {
    it("should return 400 when registering with invalid data", async () => {
      const response = await supertest(app)
        .post("/api/v1/users/register")
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });

    it("should return 201 when registering with valid data", async () => {
      await OTP.deleteOne({ email: "test@gmail.com" });

      const otp = new OTP({
        email: "test@gmail.com",
        otp: 123456,
      });

      await otp.save();

      const response = await supertest(app)
        .post("/api/v1/users/register")
        .send({
          email: "test@gmail.com",
          username: "test1",
          password: "Test@1234",
          otp: otp.otp,
        });

      console.log(response.body);

      if (response.body.data) {
        await User.findByIdAndDelete(response.body.data._id);
      }

      expect(response.status).toBe(201);
    });
  });
});
