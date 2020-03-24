import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
  console.log('route hit');
  const { endpoint } = req.query;
  console.log(req.query);
  const resp = await fetch(`http://nptriton.cqproject.net/game/6412628336050176/${endpoint}`);
  const data = await resp.json();
  console.log(data);
  res.json(data);
};
