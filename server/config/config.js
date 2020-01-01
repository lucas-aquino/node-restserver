// =======================================
//  PORT
// =======================================
process.env.PORT = process.env.PORT || 3000;

// =======================================
//  ENVIROMENT
// =======================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =======================================
//  EXPIRATION TOKEN
// =======================================
//60s 60m 24hs 30d
process.env.EXP_TOKEN = 60 * 60 * 24 * 30;

// =======================================
//  SEED TOKEN
// =======================================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// =======================================
//  DATA BASE
// =======================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// =======================================
//	GOOGLE CLIENT ID
// =======================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '555913194046-9i80m3qgg80qg4gdk48liep1if8ro5qq.apps.googleusercontent.com';



