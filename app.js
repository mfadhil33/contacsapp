const { argv, string } = require('yargs');
const yargs = require('yargs');
const {
  questions, saveContact, listContact, detailContact, deleteContact,
} = require('./Contact');

// const main = async () => {

//   const name = await questions('siapa nama anda? :');
//   const email = await questions('Masukkan email anda :');
//   saveContact(name, email);
// };


// main();


yargs.command({
  command: 'add',
  describe: 'Menambahkan  COntact baru',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string',
    },
    email: {
      describe: 'Email',
      demandOption: false,
      type: 'string',
    },
    noHp: {
      describe: 'No Hp',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    saveContact(argv.nama, argv.email, argv.noHp);
  },
}).demandCommand();

// menampilkan daftar semua nama contact
yargs.command({
  command: 'list',
  describe: 'Menampilkan semua nama & no Hp contact',
  handler: () => listContact(),
});

// menampilkan detail sebuah contact
yargs.command({
  command: 'detail',
  describe: 'Menampilkan detail sebuah contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => detailContact(argv.nama),
});


// menghapus contact berdasarkan nama
yargs.command({
  command: 'delete',
  describe: 'Menghapus kontak berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => deleteContact(argv.nama),

});

yargs.parse();
