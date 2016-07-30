/* Timestamp microservice
Pass a string as a parameter, and it will check to see whether 
that string contains either a unix timestamp or a natural language 
date (example: January 1, 2016) 

it returns both the Unix timestamp and the natural language 
form of that date

returns null for all others
*/
module.exports.timestampApi = function(dateStr) {

    var unix_timestamp, natural_timestamp

    var isDate = function(dateStr) {
        return Date.parse(dateStr)
    }

    var getInputDateType = function(dateStr) {
        if (dateStr.match(/^[\-\+]?\d+$/))
            return "unix"
        if (dateStr.match(/^[A-Za-z0-9,\s\-]+$/) && isDate(dateStr))
            return "natural"
    }

    var convUnixDate = function(unix_timestamp) {
        return new Date(unix_timestamp * 1000);
    }

    var formatDate = function(date) {
        const MONTHS = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "Ocotober", "November", "December"
        ];

        return MONTHS[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
    }

    /* Determin the input date type.
        Unix: convert to date string format MONTH DD, YYYY
        Natural: convert to unix time which is millisesconds since Jan 1 1970 
        
        return an object which contains unix and natural dates */
    switch (getInputDateType(dateStr)) {
        case 'unix':
            unix_timestamp = Number(dateStr)
            natural_timestamp = formatDate(convUnixDate(dateStr))
            break
        case 'natural':
            unix_timestamp = Date.parse(dateStr) / 1000
            natural_timestamp = formatDate(convUnixDate(unix_timestamp))
            break
        default:
            unix_timestamp = null
            natural_timestamp = null
            break
    }

    return {
        unix: unix_timestamp,
        natural: natural_timestamp
    }


}