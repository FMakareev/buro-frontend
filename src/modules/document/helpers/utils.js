import faker from 'faker';

// генерирует массив заданной длинны
const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

// генерирует объект документа для таблицы документов
const newDocument = () => ({
  id: faker.random.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  sureName: faker.name.lastName(),
  dateBirth: faker.date.past(50, 2000).toUTCString(),
  document: faker.random.number(1)
    ? {
        id: faker.random.uuid(),
        updateDate: faker.date.past().toUTCString(),
      }
    : null,
  reqStatus: faker.random.number(2),
  reqDate: faker.date.past().toUTCString(),
  bank: faker.company.companyName(),
});

export function makeData(len = 100) {
  console.log(faker);
  return range(len).map(d => ({
    ...newDocument(),
  }));
}
