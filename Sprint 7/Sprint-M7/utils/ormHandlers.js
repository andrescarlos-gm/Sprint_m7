import { sequelize } from '../orm/bd.js';
import { Author } from '../orm/Author.js';
import { Member } from '../orm/Member.js';
import { Book } from '../orm/Book.js';
import { Coauth } from '../orm/Coauth.js';
import { Borrow } from '../orm/Borrow.js';
import { Op } from 'sequelize';
import { QueryTypes } from 'sequelize';


export async function syncTablas() {
  try {
    await sequelize.sync();
    console.log('Tables successfully synchronized.');
  } catch (error) {
    console.error('Error synchronizing tables', error);
  }
}

export async function createAuthor(_author_name, _author_lastname, _born_date, _died_date) {
  const author = await Author.create({
    author_name: _author_name,
    author_lastname: _author_lastname,
    born_date: _born_date,
    died_date: _died_date
  })
};

export async function createMember(_member_rut, _member_name, _member_lastname, _address, _phone_num) {
  const member = await Member.create({
    member_rut: _member_rut,
    member_name: _member_name,
    member_lastname: _member_lastname,
    address: _address,
    phone_num: _phone_num
  })
};

export async function coauthory( _author_id, _isbn) {
  const auth_mng = await Coauth.create({
    author_id: _author_id,
    isbn: _isbn
  })
};

export async function createBook(_isbn, _title, _pages, _author_id) {
  const book = await Book.create({
    isbn: _isbn,
    title: _title,
    pages: _pages,
    author_id: _author_id
  })
};

export async function borrow(_member_rut, _isbn, _borrow_date, _due_date, _return_date) {
  const borrow = await Borrow.create({
    member_rut: _member_rut,
    isbn: _isbn,
    borrow_date: _borrow_date,
    due_date: _due_date,
    return_date: _return_date
  })
};


export async function less300pgs() {

  try {
    const books = await Book.findAll({
      where: {
        pages: {
          [Op.lt]: 300
        }
      }
    });

    books.forEach(books => {
      console.table(books.dataValues);
    });

  } catch (error) {
    console.error(error);
  }

}

export async function youngerthan1970() {
  try {
    const yng = await Author.findAll({
      where: {
        born_date: {
          [Op.gte]: 1970
                    }
              } 
    });
    yng.forEach(yng => {
      console.table(yng.dataValues);
    });
      } 
  catch (error) {
    console.error(error);
  }
};

export async function mostbrrw() {
  try {
    const users = await sequelize.query(`
    SELECT (books.title), COUNT(borrows.isbn) AS total 
    FROM borrows 
    INNER JOIN books ON borrows.isbn = books.isbn 
    GROUP BY (borrows.isbn, books.title )
    HAVING COUNT(borrows.isbn) = (
      SELECT COUNT(borrows.isbn) 
      FROM borrows
      GROUP BY borrows.isbn
      ORDER BY COUNT(borrows.isbn) DESC 
      LIMIT 1
    ) `, { type: QueryTypes.SELECT });
    console.table(users);
  }
  catch (error) {
      console.error(error);
    }
}

export async function fine() {
  try{
    const pty = await sequelize.query(`
    SELECT borrow_date, return_date, member_lastname, member_name AS member_name, members.member_rut FROM borrows 
INNER JOIN members ON borrows.member_rut = members.member_rut;
    `, { type: QueryTypes.SELECT });
      console.log('\n######################################################################\n');

     pty.forEach(pty => {
       const returndt = new Date(pty.return_date)
       const borrowdt = new Date (pty.borrow_date)
       const diference = (returndt.getTime()/86400000) - (borrowdt.getTime()/86400000);
       if (diference > 7) {
       const total = (diference - 7)*100
       console.log("Member " + pty.member_name + " " + pty.member_lastname + " has been fined " + '\x1b[31m$' + total + '\x1b[37m' + " for overdue library books");
      }
     });
     console.log('\n######################################################################');

    }
    catch (error) {
      console.error(error);
    }
}

export async function help() {

  console.log('\x1b[36m',"\n             Library Database Manager");
  console.log(`
  __________________   __________________
.-/|                  \\ /                  |\\-.
||||                   |                   ||||
||||   N'importe       |                   ||||
||||                   |                   ||||
||||                   |                   ||||
||||                   |                   ||||
||||                   |      où hors      ||||
||||                   |                   ||||
||||                   |      du monde...  ||||
||||                   |                   ||||
||||                   |                   ||||
||||__________________ | __________________||||
||/===================\\|/===================\\||

  
  `)
  console.log('Usage: node index.js [option]\n');
  console.log('######################### Synchronization ########################################\n')
  console.log('sync                     Create all tables');
  console.log('insertdata               Insert pre-stored data\n');
  console.log('#########################     Querys      ########################################\n')
  console.log('less300pgs               Books with less than 300 pgs');
  console.log('after1970                Authors born after 1970');
  console.log('mostbrrw                 Books most borrowed');
  console.log('fine                     Members fined for late delivery\n');
  console.log('##################################################################################\n')
}