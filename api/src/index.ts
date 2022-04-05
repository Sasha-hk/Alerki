// D import App from './app';
// import Database from './db/connect';

// async function start() {
//   const db = new Database();
//   const app = new App();

//   await db.connect();
//   app.listen();
// }

// start();

const r = RegExp(/\w{1,305}.@\w{1,10}.\w{1,4}/g);

const rs = r.source;

console.log(rs.replace(/\{([^}])+\}/g, '{0,1}'));

console.log(rs.match(/\{([^}])+\}/g)?.length);

