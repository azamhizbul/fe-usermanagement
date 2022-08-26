export default async function handler(req, res) {
    const rest = await fetch( process.env.URLUSERMANAGE + "/userAkses", {
      method: "DELETE",
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
  
  }
  