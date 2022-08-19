export default async function handler(req, res) {
  const rest = await fetch("http://localhost:8001/user", {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.TOKEN,
    },
    body: JSON.stringify(req.body),
  });
  const dataUser = await rest;
  const dataRes = await dataUser.json();

  res.status(dataUser.status).json(dataRes);


//   if (dataUser.status != 200) {
//     res.status(dataUser.status).json({ message: dataRes });
//   } else {
//     res.status(200).json({ message: dataRes });
//   }
}
