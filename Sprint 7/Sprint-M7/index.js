import { sequelize, testConnection } from './orm/bd.js';
import {
  createAuthor, syncTablas, createMember, coauthory, help,
  createBook, borrow, less300pgs, youngerthan1970, mostbrrw, fine
} from './utils/ormHandlers.js';

testConnection();


switch (process.argv[2]) {
  case 'sync':
    syncTablas();
    break;

  case 'insertdata':
    createAuthor('Andrés', 'Ulloa', '1982');
    createAuthor('Sergio', 'Mardones', '1950', '2012');
    createAuthor('Jose', 'Salgado', '1968', '2020');
    createAuthor('Ana', 'Salgado', '1972');
    createAuthor('Martin', 'Porta', '1976');
    createMember('1111111-1', 'Juan', 'Soto', 'Avenida 1, Santiago', '911111111');
    createMember('2222222-2', 'Ana', 'Perez', 'Pasaje 2, Santiago', '922222222');
    createMember('3333333-3', 'Sandra', 'Aguilar', 'Avenida 2, Santiago', '933333333');
    createMember('4444444-4', 'Esteban', 'Jerez', 'Avenida 3, Santiago', '94444444');
    createMember('5555555-5', 'Silvana', 'Muñoz', 'Pasaje 3, Santiago', '955555555');
    createBook('111-1111111-111', 'Cuentos de terror', '344', '3');
    createBook('222-2222222-222', 'Poesías Contemporáneas', '167', '1');
    createBook('333-3333333-333', 'Historia de Asia', '511', '2');
    createBook('444-4444444-444', 'Manual de Mecánica', '298', '5');
    coauthory('3', '111-1111111-111');
    coauthory('4', '111-1111111-111');
    coauthory('1', '222-2222222-222');
    coauthory('2', '333-3333333-333');
    coauthory('5', '444-4444444-444');
    borrow('1111111-1', '111-1111111-111', '2020-01-20', '2020-01-27', '2020-01-27');
    borrow('5555555-5', '222-2222222-222', '2020-01-20', '2020-01-27', '2020-01-30');
    borrow('3333333-3', '333-3333333-333', '2020-01-22', '2020-01-29', '2020-01-30');
    borrow('4444444-4', '444-4444444-444', '2020-01-23', '2020-01-30', '2020-01-30');
    borrow('2222222-2', '111-1111111-111', '2020-01-27', '2020-02-03', '2020-02-04');
    borrow('1111111-1', '444-4444444-444', '2020-01-31', '2020-02-07', '2020-02-12');
    borrow('3333333-3', '222-2222222-222', '2020-01-31', '2020-02-07', '2020-02-12');
    console.log('Data successfully inserted');
    break;

  case 'less300pgs':
    less300pgs();
    break;
  case 'after1970':
    youngerthan1970();
    break;

  case 'mostbrrw':
    mostbrrw();
    break;

  case 'fine':
    fine();
    break;

  case 'addauthor':
    const author_name = process.argv[3];
    const author_lastname = process.argv[4];
    const born_date = process.argv[5];
    const died_date = process.argv[6];
    try {
      createAuthor(author_name, author_lastname, born_date, died_date);
    }
    catch (error) {
      console.error(error);
    }
    break;

  case 'addmember':
    const member_rut = process.argv[3];
    const member_name = process.argv[4];
    const member_lastname = process.argv[5];
    const address = process.argv[6];
    const phone_num = process.argv[7];
    try {
      createMember(member_rut, member_name, member_lastname, address, phone_num);
    }
    catch (error) {
      console.error(error);
    }
    break;

  case 'addbook':
    const isbn1 = process.argv[3];
    const title = process.argv[4];
    const pages = process.argv[5];
    const author_id1 = process.argv[6];
    try {
      createBook(isbn1, title, pages, author_id1);
      console.log('Book successfully inserted');
    }
    catch (error) {
      console.error(error);
    }

    break;

  case 'coauthory':
    const author_id = process.argv[3];
    const isbn = process.argv[4];
    try {
      coauthory(author_id, isbn);
    }
    catch (error) {
      console.error(error);
    }
    break;

  case 'borrow':
    const member_rut2 = process.argv[3];
    const isbn2 = process.argv[4];
    const borrow_date = process.argv[5];
    const due_date = process.argv[6];
    const return_date = process.argv[6];
    try {
      borrow(member_rut2, isbn2, borrow_date, due_date, return_date);
    }
    catch (error) {
      console.error(error);
    }
    break;

  case 'help':
    help();
    break;

  default:
    help();
    break;
}
