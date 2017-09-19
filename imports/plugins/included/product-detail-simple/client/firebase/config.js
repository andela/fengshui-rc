import dotenv from "dotenv";

dotenv.config();

config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: "fengshui-rc-d4345.appspot.com",
  messagingSenderId: process.env.messagingSenderId
};

export default config;
