const { AuthorizationCode } = require('simple-oauth2');
require("dotenv").config()
const { cache } = require('../utils/cache');

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

const createClient = (mall_id) => {
    //to-do: remove the hard-coded values and move these to another file
    const client = new AuthorizationCode({
      client: {
        id: CLIENT_ID,
        secret: CLIENT_SECRET,
      },
      auth: {
        tokenHost: `https://${mall_id}.cafe24api.com`,
        tokenPath: '/api/v2/oauth/token',
        authorizeHost: `https://${mall_id}.cafe24api.com`,
        authorizePath: '/api/v2/oauth/authorize',
      },
    });
    return client;
}

exports.auth = async (req, res, next) => {
    const {mall_id} = req.query;
    if (!mall_id){
      let err = new Error("mall_id is missing!");
      err.status = 400;
      next(err);
    }
    const client = createClient(mall_id);
    const redirect_uri = `https://guarded-beyond-10106.herokuapp.com/auth/callback`;

    // Authorization uri definition
    const authorizationUri = client.authorizeURL({
      redirect_uri: redirect_uri,
      scope: 'mall.read_product,mall.read_application',
      state: mall_id
    });
    console.log(authorizationUri);
    res.redirect(authorizationUri);
}

exports.authCallback = async (req, res, next) => {
    const { code, state } = req.query;
    if (!state){
      let err = new Error("mall_id is missing!");
      err.status = 400;
      next(err);
    }
    const client = createClient(state);
    const redirect_uri = "https://guarded-beyond-10106.herokuapp.com";
    const options = {
      code,
      redirect_uri
    };

    try {
      const result = await client.getToken(options);

      console.log('The resulting token: ', result.token.access_token);

      //store the token in in-memory storage
      cache.set(result.token.mall_id, result.token.access_token);

      //mauually redirect the user since cafe24 redirection doesn't work
      res.redirect(redirect_uri);
    } catch (err) {
      console.log(err);
      next(err);
    }
}