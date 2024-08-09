import apicache from 'apicache'


export const cacheVersion = apicache.options({
  appendKey: (req, res) => `${req.headers.authorization}-${req.body.version}`,
}).middleware;