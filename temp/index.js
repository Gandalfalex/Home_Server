import Express from "express";
import fs from "fs";

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({extends : true}))

const host = '192.168.178.29';
const host1 = 'meetforsports.hopto.org';
const port = 8000;





app.get("/", (req,res) =>{
    console.log(req)
    res.send("hello world")
})




app.get("/maps", (req,res) =>{
    jsonReader("./locations.json", (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        res.send(data);
    })
})


app.get("/sports", (req,res) =>{
    jsonReader("./sports.json", (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        res.send(data);
    })
})


app.post("/send", (req,res) =>{
  let data = fs.readFileSync("./events.json","utf-8");
  let data_usable = JSON.parse(data);
  var entryLength = Object.keys(data_usable.events).length + 1;
  data_usable.events.push({[entryLength.toString()]: req.body});
  fs.writeFileSync("./events.json",JSON.stringify(data_usable),"utf-8");
  res.sendStatus(200);
})








function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
      if (err) {
        return cb && cb(err);
      }
      try {
        const object = JSON.parse(fileData);
        return cb && cb(null, object);
      } catch (err) {
        return cb && cb(err);
      }
    });
}




//app.listen(port, () => console.log("listening on port " + port))
app.listen(port, host1,  () => console.log("listening on port " + port))