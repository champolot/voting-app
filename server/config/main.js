const GITHUB_ID = process.env.GITHUBID;
const GITHUB_SECRET = process.env.GITHUBSECRET;

const DB_USER = process.env.DBUSER;
const DB_PASS = process.env.DBPASS;
const DB_URL = `mongodb://${ DB_USER }:${ DB_PASS }@ds125262.mlab.com:25262/voting`;
;

module.exports = {
  'dbUrl': DB_URL,
  'githubID': GITHUB_ID,
  'githubSecret': GITHUB_SECRET,
  'port': process.env.PORT || 8000
}
