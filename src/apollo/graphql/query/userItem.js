import faker from "faker";
import {ROLE_BANK, ROLE_CLIENT} from "../../../shared/roles";


export const useritem = () => {
  const bankName = faker.random.number(1) ? faker.name.jobTitle() : null;
  const password = faker.internet.password();
  return {
    id: faker.random.uuid(),
    bankName: bankName,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    patronymic: faker.name.lastName(),
    birthdate: faker.date.past().toUTCString(),
    gender: faker.random.arrayElement(['male', 'female']),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    masterpassword: faker.random.uuid(),
    password: password,
    confirmPassword: password,
    role: bankName ? ROLE_BANK : ROLE_CLIENT,
    token: null,
  }
};
