export default () => ({
  appSecret: process.env.JWT_SECRET,
  appExpires: process.env.JWT_EXPIRES,
  appType: 'posgres',
  appHost: process.env.DATABASE_HOST,
  appPort: +process.env.DATABASE_PORT,
  appUsername: process.env.DATABASE_USER,
  appPassword: process.env.DATABASE_PASSWORD,
  appDatabase: process.env.DATABASE_NAME,
});
