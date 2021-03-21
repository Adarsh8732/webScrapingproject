let request=require("request");
let cheerio = require("cheerio");
let path=require("path");
let fs=require("fs");
let fixnresFile = require("./fixnres");

// url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/points-table-standings";

function Table(url,dest){
    request(url,cb);
function cb(err,response,html){
    let chSelector=cheerio.load(html);
    let teamarray = chSelector(".table.table-sm.standings-widget-table.text-center.mb-0.border-bottom tbody tr");
   // console.log(teamarray.length)
    for(let i=0;i<teamarray.length;i++)
    {
        let teamnlink= chSelector(chSelector(teamarray[i]).find("td")[0]);
        let teamName = teamnlink.text();
        teamName = teamName.substring(1);
         ///console.log(teamName);
        let teamlink = teamnlink.find("a").attr("href");
        teamlink = " https://www.espncricinfo.com"+teamlink;
        // https://www.espncricinfo.com/team/mumbai-indians-335978
        // /team/mumbai-indians-33597
        // console.log(teamlink);
        // let dest = "C:\\Users\\LENOVO_PC\\Desktop\\PEPcoding  Dev\\AllAboutIpl2020";

        let folderToMake = path.join(dest , teamName);
        //let folderToMake=dest+ "\\topics" ;
        //console.log(folderToMake);
        if(fs.existsSync(folderToMake) == false)
        {
            fs.mkdirSync(folderToMake);
            // console.log(folderToMake);
        }
        fixnresFile.fn(teamlink,folderToMake);
    }
    

}
}
module.exports={
    fn:Table
}