// генерирует объект документа для таблицы документов
import faker from "faker";


export const documentItem = () => {
  return {
    id: faker.random.uuid(),
    status: faker.random.arrayElement(['pending_approval', 'not_approval', 'approval']),
    date: faker.date.past().toUTCString(),
    file: faker.image.imageUrl(),
  }
};

