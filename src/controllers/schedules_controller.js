'use strict'

const repository = require('../repositories/schedules_repository');

// Pega todos os horários cadastrados
exports.get = async (req, res, next,) => {
    try {
        let data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

//Insere o ponto no banco de dados
exports.post = async (req, res, next,) => {
    try{
        //String com data e hora concatenadas
        
        let dtEntry = generateDate(req.body.dateEntry + " " + req.body.entry);
        let dtExit = generateDate(req.body.dateExit + " " + req.body.exit);
        
        // String com data e hora (padrão) cancatenadas / Variáveis utilizadas apenas para fins de cálculo
        // início hora noturna
        let night_hours_init = generateDate(req.body.dateEntry + " 22:00");
        let night_hours_init2 = generateDate(req.body.dateExit + " 22:00");
        // fim hora noturna
        let night_hours_finish = generateDate(req.body.dateEntry + " 05:00"); 
        let night_hours_finish2 = generateDate(req.body.dateExit + " 05:00");

        let daytime_hours = 0;
        let night_hours = 0;
        let total_hours = 0;
        if(calcHours(dtEntry, dtExit) === 'invalid'){
            res.status(500).send({
                message: "O período deve ser inferior a 24 horas"
            });
        }else{
            //Entrou antes das 22 e depois das 05 e saiu antes das 05
            if((dtEntry < night_hours_init  && dtEntry > night_hours_finish) && dtExit < night_hours_finish2){
                night_hours = calcHours(night_hours_init, dtExit);
            }//Entrou antes das 22 e depois das 05 e saiu depois das 05 antes das 22
            else if((dtEntry < night_hours_init  && dtEntry > night_hours_finish) && (dtExit > night_hours_finish2 && dtExit < night_hours_init2)){
                night_hours = calcHours(night_hours_init, night_hours_finish2);
            }//Entrou antes das 22 e depois das 05 e saiu depois das 22
            else if((dtEntry < night_hours_init  && dtEntry > night_hours_finish) && dtExit > night_hours_init2){
                night_hours = calcHours(night_hours_init, dtExit);
            }//Entrou depois das 22 ou antes das 05 e saiu antes das 05
            else if((dtEntry > night_hours_init || dtEntry < night_hours_finish) && dtExit < night_hours_finish2){
                night_hours = calcHours(dtEntry, dtExit);
            }// Entrou antes da 05 e saiu antes das 05 do outro dia
            else if(dtEntry < night_hours_finish && dtExit < night_hours_finish2){
                night_hours = calcHours(dtEntry, night_hours_finish);
                night_hours = night_hours + calcHours(night_hours_init, dtExit);
            }//Entrou depois das 22 ou antes das 05 e saiu depois das 05 e antes das 22
            else if((dtEntry > night_hours_init || dtEntry < night_hours_finish) && (dtExit > night_hours_finish2 && dtExit < night_hours_init2)){
                night_hours = calcHours(dtEntry, night_hours_finish2);
            }//Entrou depois das 22 ou antes das 05 e saiu depois das 22
            else if((dtEntry > night_hours_init || dtEntry < night_hours_finish) && dtExit > night_hours_init2){
                night_hours = calcHours(dtEntry, night_hours_finish2);
                night_hours = night_hours + calcHours(night_hours_init2, dtExit);
            }
            total_hours = calcHours(dtEntry, dtExit);
            daytime_hours = total_hours - night_hours;

            
            //Insere no banco de dados
            await repository.create({
                dtEntry: req.body.dateEntryAux,
                entry: req.body.entry,
                dtExit: req.body.dateExitAux,
                exit: req.body.exit,
                daytime_hours: daytime_hours.toFixed(2),
                night_hours: night_hours.toFixed(2),
                total_hours: total_hours.toFixed(2),
            });
            res.status(201).send({ message: "Total:" + total_hours + " Noturnas:" + night_hours + " Diurnas:" + daytime_hours});
        }        

    } catch (error){
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

// Função que faz a subtração das datas
function calcHours(dtEntry, dtExit){
    //Subtração das datas (resultado em milessegundos)
    let diffMs = (dtExit - dtEntry);
    // Verifica se o período é menor que 24 horas
    if(diffMs >= 86400000)return 'invalid';
    // Calculando horas
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    // Calculando minutos
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    if(diffMins < 10) diffMins = "0" + diffMins;
    //Convertendo horas e minutos para float
    let diff = parseFloat(diffHrs + "." + diffMins);
    return diff;
}

// Função que gera datas a partir de Strings
function generateDate(dthrs){
    // Transformando a String em Date
    let date = new Date(dthrs.slice(0,4), dthrs.slice(4,6),dthrs.slice(6,8), dthrs.slice(9,11), dthrs.slice(12,14));
    return date;
}
