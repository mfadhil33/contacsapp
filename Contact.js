const readline = require('readline');
const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');




const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// membuat folder data
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file
const filePath = './data/contact.json';
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, [], 'utf-8');
}

const questions = (quest) => new Promise((resolve, reject) => {
  read.question(quest, (name) => {
    resolve(name);
  });
});

const loadContact = () => {
  const fileBuffer = fs.readFileSync('./data/contact.json', 'utf-8');
  const contactApp = JSON.parse(fileBuffer);
  return contactApp;
};

const saveContact = (nama, email, noHp) => {

  const contact = {
    nama,
    email,
    noHp,
  };

  // const fileBuffer = fs.readFileSync('./data/contact.json', 'utf-8');
  // const contactApp = JSON.parse(fileBuffer);
  const contacts = loadContact();

  // cek nama sama
  const findNamaDuplicat = contacts.find((contact) => contact.nama === nama);
  if (findNamaDuplicat) {
    console.log(chalk.red.inverse.bold('Nama yang di inputkan sebelumnya sudah ada,silahkan input nama  lain!'));
    return false;
  }

  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold(' Email tidak valid!'));
      return false;
    }
  }

  // cek nomor handphone
  if (!validator.isMobilePhone(noHp, 'id-ID')) {
    console.log(chalk.red.inverse.bold(' No Hp tidak valid!'));
    return false;
  }

  if (!findNamaDuplicat) {
    contacts.push(contact);
    fs.writeFileSync('./data/contact.json', JSON.stringify(contacts));
    console.info(chalk.green.inverse.bold('Terimkasih sudah menginputkan data'));
    read.close();
  }


};

const listContact = () => {
  const contacts = loadContact();
  console.info(chalk.cyan.inverse.bold('Daftar Kontak\t\n'));

  contacts.forEach((contact, i) => {
    console.log(chalk.whiteBright.inverse.bold(`${i + 1}. ${contact.nama} - ${contact.noHp}`));
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find((conc) => conc.nama.toLowerCase() === nama.toLowerCase());

  if (!contact) {
    console.log(chalk.redBright.inverse.bold(`${nama} tidak di temukan`));
    return false;
  }

  console.log(chalk.green.inverse.bold(`Nama : ${contact.nama}`));
  console.log(`NoHp : ${contact.noHp}`);

  if (contact.email) {
    console.log(`Email : ${contact.email}`);
  }

};


const deleteContact = (nama) => {
  const contact = loadContact();
  const newContact = contact.filter((contact) => contact.nama !== nama.toLowerCase());

  if (contact.length === newContact.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak di temukan!`));
    return false;
  }
  fs.writeFileSync('data/contact.json', JSON.stringify(newContact));


  console.log(
    chalk.green.inverse.bold(`Data Contact ${nama} berhasil di hapus`),
  );
};



module.exports = {
  saveContact,
  listContact,
  loadContact,
  detailContact,
  deleteContact,
};
