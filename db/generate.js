module.exports = function(){
    const casual = require("casual").fr_FR;
    const _ = require("lodash");

    return {
        Orders: _.times(50, function(n){
            return{
                id: n + 1,
                number: casual.country_code+casual.unix_time,
                client: casual.full_name,
                date_order: casual.date(format = 'DD/MM/YYYY'),
                state: casual.random_element(['Nouvelle', 'En Traitement', 'Expédiee'])
            }
        }),
        Products: _.times(300, function(n){
            return {
                id: n+1,
                name: casual.random_element(['KeyNetic', 'KeyVibe'])+'V'+casual.day_of_week+casual.word,
                weight: casual.day_of_year,
                OrderId: casual.integer(from=1,to=50)
            }
        })

    }
}