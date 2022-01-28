module.exports = function(){
    const casual = require("casual").fr_FR;
    const _ = require("lodash");

    return {
        Orders: _.times(50, function(n){
            return{
                id: n + 1,
                number: casual.country_code+casual.unix_time,
                client: casual.full_name,
                date_arrival: casual.date(format = 'DD/MM/YYYY'),
                date_trait: casual.date(format = 'DD/MM/YYYY'),
                date_send: casual.date(format = 'DD/MM/YYYY'),
                state: casual.random_element(['Nouvelle', 'En Traitement', 'Expédiée'])
            }
        }),
        Products: _.times(300, function(n){
            return {
                id: n+1,
                name: casual.word,
                referance: casual.random_element(['KeyNetic', 'KeyVibe'])+'V'+casual.day_of_week+casual.word,
                weight: casual.day_of_year,
                description: casual.sentence,
                is_scanned: casual.boolean,
                OrderId: casual.integer(from=1,to=50),
                ColisId: 0,
            }
        }),
        Colis: _.times(5, function(n){
            return {
                id: n + 1,
                weight: (n+1) * 500,
                name: (n+1)*500 + ' g',
                orderId: 0 ,
                products: []
            }
        })
    }
}