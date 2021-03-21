let request = require("request");
let cheerio = require("cheerio");
let fs= require("fs");
let path = require("path");
const { stringify } = require("querystring");
//  let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-mumbai-indians-41st-match-1216521/full-scorecard";
 //let url= "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
function single(url,dest){
    //  dest ="C:\\Users\\LENOVO_PC\\Desktop\\PEPcoding  Dev\\home work\\iplPlayerWebScraping\\raw\\Ipl 2020\\Chennai Super Kings";
    let teamName = dest.split("\\").pop().trim();
    request(url,cb);
 //let teamName = "Chennai Super Kings";
    function cb(err,response,html){
        if(err)
        console.log(err);
        let chSelector = cheerio.load(html);
        //for oponent team;
        let optname ="";
        let result="";
        let ts = chSelector(".event .teams .team.team-gray .name-detail").text().trim();
        if(ts==teamName)
        {
            result = "loss";
        }
        else
        {
            result = "win";
        }
        let teams=chSelector(".match-info.match-info-MATCH .teams .team .name-detail");
        for(let i=0;i<teams.length;i++){
            if(chSelector(teams[i]).text() != teamName)
            {
                optname = chSelector(teams[i]).text();
            }
            // console.log(chSelector(teams[i]).text());
            
        }
        // console.log(optname);
        let teamBlock = chSelector(".card.content-block.match-scorecard-table .Collapsible");
        // console.log(teamBlock.length);
        let info = chSelector(".match-info.match-info-MATCH .description").text();
        let infoarr = info.split(",")
        let date = infoarr[2];
        let place = infoarr[1];
        for(let i=0;i<teamBlock.length;i++)
        {
            let myteam=chSelector(teamBlock[i]).find(".Collapsible__trigger.is-open h5").text();
            myteam = myteam.split("INNINGS")[0].trim();
            if(myteam == teamName)
            {
                // console.log(myteam);
                let alltrs = chSelector(teamBlock[i]).find(".table.batsman tbody tr")
                // console.log(alltrs.length);
                for(let j=0;j<alltrs.length;j++){
                let Player="";
                let batsman=chSelector(alltrs[j]).find("td");
                if(batsman.length == 8)
                {
                    obj= { playerName : chSelector(batsman[0]).text(),
                     runs : chSelector(batsman[2]).text(),
                    // console.log(playerName, "    ", runs);
                     boll:chSelector(batsman[3]).text(),
                     sixes : chSelector(batsman[5]).text(),
                     fours : chSelector(batsman[6]).text(),
                     sr : chSelector(batsman[7]).text(),
                     date : date,
                     place: place,
                     result: result,
                     oponentTeam: optname
                    }
                    Player = chSelector(batsman[0]).text();
                   // console.log(playerName+ "------"   + runs+ "------"+  sixes  +"--------"+    fours   + "--------" +   sr+" ----"+optname);
                //    console.log(obj);
                    let fTm = path.join(dest,Player+".json");
                    // fs.openSync(fTm,'w');
                    // JSON.stringify(obj);
                    fs.appendFileSync(fTm,JSON.stringify(obj)+"\n")

                }
                }
            }
        }
        
    }
}
//  single(url,"")
module.exports={
    fn:single
}