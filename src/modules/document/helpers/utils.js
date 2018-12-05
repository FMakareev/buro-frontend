import faker from "faker";

// генерирует массив заданной длинны
const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

// генерирует объект документа для таблицы документов
const newDocument = () => {
  return {
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    sureName: faker.name.lastName(),
    document: faker.random.number(1) ? {
      id: faker.random.uuid(),
      updateDate: faker.date.past().toUTCString(),
    } : null
  }
};

export function makeData(len = 100) {

  return range(len).map(d => {
    return {
      ...newDocument(),
    };
  });
}
