/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.eveningdeserttours.com',
  generateRobotsTxt: true,
  exclude: [
    '/admin/*',
    '/cancel',
    '/success',
  ],
};
