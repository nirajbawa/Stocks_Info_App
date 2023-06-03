const mongoose = require("mongoose");


const apiDataSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    last:{
        type:String,
        require:true
    },
    buy:{
        type:String,
        require:true
    },
    sell:{
        type:String,
        require:true
    },
    volume:{
        type:String,
        require:true
    },
    base_unit:{
        type:String,
        require:true
    },
    quote_unit:{
        type:String,
        require:true
    },
    timestamp:{
        type:Date,
        default: Date.now
    }
});


const apiDataSchemaModel = new mongoose.model("datas", apiDataSchema);

module.exports = apiDataSchemaModel;