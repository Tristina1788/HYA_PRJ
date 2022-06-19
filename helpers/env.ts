const url = "https://app.hya.work/login/";
const email = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

if (!url || !email || !password) {
  throw 'Missing environment variables';
}

export const env = { url, email, password};
