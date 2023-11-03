import httpProxy from 'http-proxy';

const API_URL = process.env.NEXT_PUBLIC_ADOBE_COMMERCE_URL + 'graphql';

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
  return new Promise((resolve, reject) => {
    proxy.web(req, res, { target: API_URL, changeOrigin: true }, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};
