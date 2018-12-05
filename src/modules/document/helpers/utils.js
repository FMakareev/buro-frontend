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
  reqStatus: faker.random.number(2),
  document: faker.random.number(1)
    ? {
        id: faker.random.uuid(),
        updateDate: faker.date.past().toUTCString(),
      }
    : null,
});

export function makeData(len = 100) {
  return range(len).map(d => ({
    ...newDocument(),
  }));
}
