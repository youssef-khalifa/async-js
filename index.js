const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');
const { reject } = require('superagent/lib/request-base');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('i couldnt find it 💥');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('couldnt find it 💥');
      resolve('success');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`breed: ${data}`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);
    await writeFilePro('dog-img.txt', res.body.message);
    console.log('random dog save');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2 : ready';
};
console.log('1: will get pics');
getDogPic().then((x) => {
  console.log(x);
  console.log('3: done');
})
// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro('dog-mg.txt', res.body.message);
//   }).then(()=>{
//     console.log('random dog save');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
