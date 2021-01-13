import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
  console.log('route hit');
  // const GAME_ID = 4985152263159808;
  const { endpoint } = req.query;
  console.log(req.query);
  const resp = await fetch(`http://nptriton.cqproject.net/game/${process.env.GAME_ID}/${endpoint}`);
  const data = await resp.json();
  console.log(data);
  res.json(data);
};
