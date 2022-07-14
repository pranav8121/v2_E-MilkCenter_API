const date = require('date-and-time');
const doc_dailyData = require("../../Schemas/doc_dailyData");

class clsTruncate {
    async truncateDailyData() {
        try {
            let obj_response={}
            const data = await doc_dailyData.remove({});
            console.log(data);
            Object.assign(obj_response, { status: 'success' }, { result: "Truncated SuccesFully!!" });
            return obj_response;
        }
        catch (err) {
            console.log(err);
            return err;
        }
    }
}


module.exports = clsTruncate;