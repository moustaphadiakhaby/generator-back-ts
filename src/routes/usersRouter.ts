import express, { Response, Request } from "express";
import { faker } from "@faker-js/faker";
import { User, UserProps } from "../models/User";

const router = express.Router();

router.get("/user", async (req: Request, res: Response) => {
  try {
    const [users, countUsers] = await Promise.all([
      User.find({}),
      User.countDocuments({}),
    ]);

    const response = {
      count: countUsers,
      users,
    };

    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

router.post("/user", async (req: Request, res: Response) => {
  try {
    console.log(faker.name.firstName());

    const newUser: UserProps = {
      fullName: faker.name.firstName() + " " + faker.name.lastName(),
      city: faker.address.city(),
      age: faker.datatype.number({
        min: 18,
        max: 80,
      }),
      avatar: faker.image.avatar(),
    };

    await User.create(newUser);

    res.send(newUser);
  } catch (error) {
    console.log(error);
  }
});

router.post("/user5", async (req: Request, res: Response) => {
  try {
    for (let i = 0; i < 5; i++) {
      const newUser: UserProps = {
        fullName: faker.name.firstName() + " " + faker.name.lastName(),
        city: faker.address.city(),
        age: faker.datatype.number({
          min: 18,
          max: 80,
        }),
        avatar: faker.image.avatar(),
      };

      await User.create(newUser);
    }

    res.send("5 users added");
  } catch (error) {
    console.log(error);
  }
});

router.put("/user", async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.body.id);

    res.send("this user deleted");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/user", async (req: Request, res: Response) => {
  try {
    await User.deleteMany();

    res.send("all users deleted");
  } catch (error) {
    console.log(error);
  }
});

export { router as usersRouter };
