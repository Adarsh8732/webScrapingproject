let request =require("request");
let cheerio = require("cheerio");
let path=require("path");
let fs=require("fs");
let matchTeamsFile=require("./matchteams");
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

request(url,cb);
function cb(err,response,html){
   let chSelector= cheerio.load(html);
   let table=chSelector(chSelector(".jsx-850418440.navbar-nav li a")[2]);
   let tablelink = table.attr("href");
   tablelink="https://www.espncricinfo.com"+tablelink;
//    console.log(tablelink);
    //https://www.espncricinfo.com/series/ipl-2020-21-1210595/points-table-standings
    // /series/ipl-2020-21-1210595/points-table-standings
    // let dest="C:\\Users\\LENOVO_PC\\Desktop\\PEPcoding  Dev";
    let dest = __dirname;
    let folderName = "Ipl 2020";
    let folderToMake = path.join(dest , folderName);
    //let folderToMake=dest+ "\\topics" ;
    //console.log(folderToMake);
    if(fs.existsSync(folderToMake) == false)
    {
        fs.mkdirSync(folderToMake);
    }
    matchTeamsFile.fn(tablelink,folderToMake);

}