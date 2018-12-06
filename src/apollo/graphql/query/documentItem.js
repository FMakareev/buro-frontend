// генерирует объект документа для таблицы документов
import faker from "faker";
import {STATUS_APPROVAL, STATUS_NOT_APPROVAL, STATUS_PENDING} from "../../../shared/statuses";


export const documentItem = () => {
  return {
    id: faker.random.uuid(),
    status: faker.random.arrayElement([STATUS_PENDING, STATUS_NOT_APPROVAL, STATUS_APPROVAL]),
    date: faker.date.past().toUTCString(),
    file: faker.image.imageUrl(),
  }
};

