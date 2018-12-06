import faker from "faker";


export const userItem = () => {
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
    masterPassword: faker.random.uuid(),
    password: password,
    retypePassword: password,
    role: bankName ? 'bank' : 'client',
    token: null,
  }
};
