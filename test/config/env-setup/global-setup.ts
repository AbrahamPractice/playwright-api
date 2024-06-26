import * as dotenv from 'dotenv'


async function globalSetup(){
    dotenv.config({path:'config/environment/.env.qa'});
}

export default globalSetup;