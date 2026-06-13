import app from "./src/index.js";
import EnvDetails from "./src/utils/envDetails.js";

app.listen(EnvDetails.PORT ,()=>{
    console.log(`Server listen on port ${EnvDetails.PORT}.`)
})