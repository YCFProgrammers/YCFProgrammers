app.post('/github-callback', async (req, res) => {
    const { code } = req.body;
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: 'Ov23liBUQ0CgVMCwp4Xk',
      client_secret: 'e9fadf1d9bb71f1a6e9ffcb10c589f7456b015d6',
      code,
    }, {
      headers: {
        Accept: 'application/json'
      }
    });
    res.json(response.data);
  });
  