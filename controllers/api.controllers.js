const { default: axios } = require("axios");
const apiDataSchemaModel = require("../models/api.model");


let api = async (req, res) => {
    // fettching top 10 data from api and store in database
    try{
        console.log("ok1")
        let datastore = await fetchAndStoreData();
        if(datastore)
        {
            // fetching last 10  stored data 
            const result = await apiDataSchemaModel.find()
            .sort({ timestamp: -1 })
            .limit(10);
            console.log("ok2")
            res.status(200).send(result)
        }
        else{
            res.status(204).send({msg:"no content"})
        }
    }
    catch(e)
    {
        res.status(500).send()
    }
    

    
}


let fetchAndStoreData = async () => {
    try {
        // fetching data from api
        let response = await axios("https://api.wazirx.com/api/v2/tickers/")
        let data = response.data

        // store top 10 objs from api

        let count = 0;

        for (let i in data) {

            if (count == 10) {
                break;
            }

            let obj = {
                name: data[i].name,
                last: data[i].last,
                buy: data[i].buy,
                sell: data[i].sell,
                volume: data[i].volume,
                base_unit: data[i].base_unit,
                quote_unit: data[i].quote_unit
            }

            try {

                let c1 = new apiDataSchemaModel(
                    obj
                );

                let result = await c1.save();

            }
            catch (e) {
                console.log(e);
            }

            count++;
        }

        return true
    }
    catch (e) {
        console.log(e)
        return false;
    }


}


module.exports = api