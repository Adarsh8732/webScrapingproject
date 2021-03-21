let request = require("request");
let cheerio = require("cheerio");
let allMatchesFile = require("./allMatchesOfTeam");

// url ="https://www.espncricinfo.com/team/chennai-super-kings-335974/match-schedule-fixtures";
function results(url,dest){
    request(url,cb);
    function cb(err,response,html){
        if(err)
        console.log(err);
        let chSelector = cheerio.load(html);
        let fixnres = chSelector(".widget-tabs.team-scores-tabs a");
        //  [2].attr("href");
        //  let reslink = 
        // console.log(fixnres.length);
        let reslink = chSelector(fixnres[1]).attr("href");
        reslink = "https://www.espncricinfo.com"+ reslink;
        //                              /team/chennai-super-kings-335974/match-results
        // https://www.espncricinfo.com/team/chennai-super-kings-335974/match-results
        // console.log(reslink);
        allMatchesFile.fn(reslink,dest);
    }
}

module.exports={
    fn:results
}