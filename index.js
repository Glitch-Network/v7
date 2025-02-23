/*(async() => {
    await import('./index.mjs');
  })();*/

  
  
  const { createBareServer } = require('@tomphttp/bare-server-node');
  const { createServer } = require('http');
  const Fastify = require('fastify');
  const fastifyStatic = require('@fastify/static');
  const { join } = require('path');
  const httpProxy = require('http-proxy');
  const bare = createBareServer('/bare/');
  const fastify = Fastify();
  const proxyServer = httpProxy.createProxyServer();
  
  console.log("Fetching proxies...");
  


  fastify.get('/region', async (req, reply) => {
    const primaryUrl = 'https://ipapi.co/json/';
    const backupUrl = 'http://ip-api.com/json/';

    async function fetchPrimaryAPI() {
        try {
            const response = await fetch(primaryUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch region data from primary API');
            }
            const data = await response.json();
            return {
                region: data.region,
                country: data.country,
                city: data.city,
                full_name: data.country_name
            };
        } catch {
            return null;
        }
    }

    async function fetchBackupAPI() {
        try {
            const response = await fetch(backupUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch region data from backup API');
            }
            const data = await response.json();
            return {
                region: data.regionName,
                country: data.countryCode,
                city: data.city,
                full_name: data.country
            };
        } catch {
            return null;
        }
    }

    try {
        let primaryData = await fetchPrimaryAPI();

        if (!primaryData) {
            primaryData = await fetchBackupAPI();
        }

        if (!primaryData) {
            throw new Error('Both primary and backup APIs failed.');
        }

        reply.status(200).send(primaryData);
    } catch {
        reply.status(500).send({ error: 'Failed to fetch the region data' });
    }
});

  async function getProxies(url) {
      try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.data && Array.isArray(data.data)) {
              return data.data.map(proxy => ({
                  proxy: `${proxy.ip}:${proxy.port}`,
                  country: proxy.country
              }));
          } else {
              console.error('Unexpected JSON structure:', data);
              return [];
          }
      } catch (error) {
          console.error('Error fetching data:', error);
          return [];
      }
  }
  
  const url = 'https://proxylist.geonode.com/api/proxy-list?speed=fast&limit=500&page=1&sort_by=lastChecked&sort_type=desc';
  
  let proxies = [];
  
  getProxies(url).then(fetchedProxies => {
      proxies = fetchedProxies;
  });
  
  __dirname = join(__filename, '..');
  
  fastify.register(fastifyStatic, {
      root: join(__dirname, 'public'),
      prefix: '/',
      decorateReply: false,
  });

  
  fastify.get("/gdomain/", async (req, reply) => {
      try {
          const response = await fetch("https://raw.githubusercontent.com/Glitch-Network/glitch_net_domains/main/db.txt");
          const data = await response.text();
          reply.status(200).send(data);
      } catch (error) {
          reply.status(500).send({ error: "Failed to fetch the data" });
      }
  });
  
  fastify.get('/vpn/*', (req, reply) => {
      const countryCode = req.headers['glitch-vpn-country-code'];
      if (!countryCode) {
          reply.status(400).send('glitch-vpn-country-code header is missing');
          return;
      }
  
      const filteredProxies = proxies.filter(proxy => proxy.country === countryCode.toUpperCase());
  
      if (filteredProxies.length === 0) {
          reply.status(404).send('No proxies found for the specified country code');
          return;
      }
  
      const randomProxy = filteredProxies[Math.floor(Math.random() * filteredProxies.length)].proxy;
  
      delete req.headers['glitch-vpn-country-code'];
  
      proxyServer.web(req.raw, reply.raw, { target: `http://${randomProxy}` }, (err) => {
          if (err) {
              console.error('Proxy error:', err);
              reply.status(500).send('Proxy error');
          }
      });
  });
  
  fastify.get('/search_complete/*', async (req, reply) => {
      const query = req.params['*']; // Get the search query from the URL path
      if (!query) {
          reply.status(400).send('Search query is missing');
          return;
      }
  
      try {
          const response = await fetch(`https://google.com/complete/search?client=firefox&hl=en&q=${encodeURIComponent(query)}`);
          const suggestions = await response.json();
          reply.status(200).send(suggestions);
      } catch (error) {
          console.error('Error fetching search suggestions:', error);
          reply.status(500).send('no search results.');
      }
  });
  
  // 404 handler for all undefined routes
  fastify.setNotFoundHandler((req, reply) => {
      reply.status(404).sendFile('404.html', { root: join(__dirname, 'public') });
  });
  
  const server = createServer();
  
  server.on('request', (req, res) => {
      if (bare.shouldRoute(req)) {
          // decrypt the body

          

          bare.routeRequest(req, res);
          return;
      }
  
      fastify.ready(err => {
          if (err) throw err;
          fastify.server.emit('request', req, res);
      });
  });
  
  server.on('upgrade', (req, socket, head) => {
      if (bare.shouldRoute(req, socket, head)) {
          bare.routeUpgrade(req, socket, head);
      } else {
          socket.end();
      }
  });
  
  server.listen(process.env.PORT || 8080, () => {
      console.log(`Server listening on port ${process.env.PORT || 8080}`);
  });
  