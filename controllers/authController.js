const { AuthorizationCode } = require('simple-oauth2');
require("dotenv").config()

const MALL_ID = process.env.MALL_ID
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

//to-do: remove the hard-coded values and move these to another file
const client = new AuthorizationCode({
    client: {
      id: CLIENT_ID,
      secret: CLIENT_SECRET,
    },
    auth: {
      tokenHost: `https://${MALL_ID}.cafe24api.com`,
      tokenPath: '/api/v2/oauth/token',
      authorizeHost: `https://${MALL_ID}.cafe24api.com`,
      authorizePath: '/api/v2/oauth/authorize',
    },
  });
   
  // Authorization uri definition
  const authorizationUri = client.authorizeURL({
    redirect_uri: "https://guarded-beyond-10106.herokuapp.com/auth/callback",
    scope: 'mall.read_product,mall.read_application'
  });

exports.auth = async (req, res, next) => {
    console.log(authorizationUri);
    res.redirect(authorizationUri);
}

exports.authCallback = async (req, res, next) => {
    const { code } = req.query;
    const options = {
      code,
    };

    try {
      const result = await client.getToken(options);

      console.log(result);
      console.log('The resulting token: ', result.token);

      return res.status(200).json(result.token);
    } catch (error) {
      console.error('Access Token Error', error);
      return res.status(500).json('Authentication failed');
    }
}