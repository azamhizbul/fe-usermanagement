export default async function handler(req, res) {
  const rest = await fetch(process.env.URLUSERMANAGE + "/user", {
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
  console.log(dataRes);
  res.status(dataUser.status).json(dataRes);


//   if (dataUser.status != 200) {
//     res.status(dataUser.status).json({ message: dataRes });
//   } else {
//     res.status(200).json({ message: dataRes });
//   }
}
