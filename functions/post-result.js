const airtable = require('airtable');
exports.handler = async function(context, event, callback) {
    try{
        base = new airtable({
            apiKey: context.AIRTABLE_API_KEY,
        }).base(context.AIRTABLE_BASE_ID);

        await base('Health Survey').create([
            {
              "fields": {
                "Reason": event.Reason,
                "Frequency": event.Frequency,
              }
            }
          ]);
        callback(null,'Success')
    }
    catch(err){
        console.log(err);
        callback('err ' + err);
    }
};