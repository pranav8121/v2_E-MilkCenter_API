const date = require('date-and-time');
const collection = require("../../Schemas/doc_dailyData");

class clsDailyData {
    async getTodayData(req) {
        try {
            let obj_response = {};
            let now = new Date();
            let today = date.format(now, 'YYYY-MM-DD');
            console.log(today);
            let data = {
                UId: req.UId,
                hour: req.hour,
                date: new Date(today).toISOString()
            }
            Object.assign(data, {});
            const a = await collection.find(data);
            if (a.length > 0) {
                Object.assign(obj_response, { status: 'success' }, { result: a });
                return obj_response;
            } else {
                Object.assign(obj_response, { status: 'success' }, { result: "NA" });
                return obj_response;
            }
        } catch (err) {
            console.log(err);
            return err;
        };
    };

    async postData(req) {
        try {
            let obj_response = {};
            let now = new Date();
            let data = {
                Name: req.Name,
                No: req.No,
                milk: req.milk,
                fat: req.fat,
                snf: req.snf,
                rate: req.rate,
                t_rate: req.t_rate,
                hour: req.hour,
                type: req.type,
                UId: req.UId
            };
            let time = date.format(now, 'HH:mm:ss').toString();
            let today = date.format(now, 'DD-MM-YYYY');
            let iFexist = await collection.find({ No: req.No, hour: req.hour, date: new Date(today).toISOString() });
            Object.assign(data, { date: new Date(today).toISOString() }, { time: time });
            if (iFexist.length == 0) {
                console.log("Posting Data!");
                let createdData = await collection.create(data);
                if (Object.keys(createdData).length !== 0) {
                    Object.assign(obj_response, { status: 'success' }, { result: "Data Added Successfully" });
                    return obj_response;
                } else {
                    Object.assign(obj_response, { status: 'success' }, { result: "NA" });
                    return obj_response;
                }
            } else {
                Object.assign(obj_response, { status: 'success' }, { result: "Entry Already Exist" });
                return obj_response;
            };
        }
        catch (err) {
            console.log(err);
            return err;
        }

    };

    async getBill(req) {
        try {
            let obj_response = {};
            let now = new Date();
            let obj_dates
            if (req.BillDetails == 'current') {
                obj_dates = this.getCurrentBill()
            }
            else if (req.BillDetails == 'last') {
                obj_dates = this.getLastBill()
            }
            const data={
                UId:req.UId,
                No:req.No,
                date:{$gte:new Date(obj_dates.from).toISOString(),$lte:new Date(obj_dates.to).toISOString()}
            };
            console.log(new Date(obj_dates.from))
            const doc = await collection.find(data);
            if (doc.length > 0) {
                Object.assign(obj_response, { status: 'success' }, { result: doc });
                return obj_response;
            } else {
                Object.assign(obj_response, { status: 'success' }, { result: "NA" });
                return obj_response;
            }
        }
        catch (err) {
            console.log(err);
            return err
        }
    }

    getCurrentBill() {
        let obj_date = {};
        let now = new Date();
        let cur_date = now.getDate();
        let cur_month = ("0" + (now.getMonth() + 1)).slice(-2)
        let cur_year = now.getFullYear()
        let days_in_mon = this.daysInMonth(cur_month, cur_year)
        if (1 <= cur_date <= 10) {
            return Object.assign(obj_date, { from: `${cur_year}/${cur_month}/01` }, { to: `${cur_year}/${cur_month}/10` });
        }
        else if (11 <= cur_date <= 20) {
            return Object.assign(obj_date, { from: `11/${cur_month}/${cur_year}` }, { to: `20/${cur_month}/${cur_year}` });
        }
        else if (21 <= cur_date <= 31) {
            return Object.assign(obj_date, { from: `21/${cur_month}/${cur_year}` }, { to: `${days_in_mon}/${cur_month}/${cur_year}` });
        }
    }

    getLastBill() {
        let obj_date = {};
        let now = new Date();
        let cur_date = now.getDate();
        let date = new Date();
        date.setDate(date.getDate() - 10);
        let cur_month = ("0" + (now.getMonth() + 1)).slice(-2)
        let days_in_mon = this.daysInMonth(cur_month, cur_year)
        if (1 <= date <= 10) {
            return Object.assign(obj_date, { from: `01/${cur_month}/${cur_year}` }, { to: `10/${cur_month}/${cur_year}` });
        }
        else if (11 <= date <= 20) {
            return Object.assign(obj_date, { from: `11/${cur_month}/${cur_year}` }, { to: `20/${cur_month}/${cur_year}` });
        }
        else if (21 <= date <= 31) {
            console.log("Third");
        }
    }

    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
};

module.exports = clsDailyData;