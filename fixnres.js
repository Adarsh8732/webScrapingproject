let request = require("request");
let cheerio  = require("cheerio");
let fs = require("fs");
let path = require("path");
let resultsFile = require("./result");
// let url = " https://www.espncricinfo.com/team/chennai-super-kings-335974";

function FixNRes(url,dest){
    request(url,cb);
    function cb(err,response,html){
    // let dest="C:\\Users\\LENOVO_PC\\Desktop\\PEPcoding  Dev\\AllAboutIpl2020\\Chennai Super Kings";
    let chSelector = cheerio.load(html);
    // let teamstats =    
    let fixnres=chSelector(".custom-scroll .navbar-nav li a");
    //  console.log(fixnres.length);
    linkOfFisnRes = chSelector(fixnres[1]).attr("href");
    // console.log(linkOfFisnRes);
    let finalLink="https://www.espncricinfo.com"+linkOfFisnRes;
    // console.log(finalLink);
    resultsFile.fn(finalLink,dest);
}
}
module.exports ={
    fn:FixNRes
}