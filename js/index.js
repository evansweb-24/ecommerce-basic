const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage("./scratch");

// menghapus semua data
localStorage.clear()

localStorage.removeItem('username');

//menyimpan data
localStorage.setItem('username', 'Evans');


// menghapus semua data
localStorage.clear()


//mengambik data
console.log(localStorage.getItem('nama'));