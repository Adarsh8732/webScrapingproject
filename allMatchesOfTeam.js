let request = require("request");
let cheerio = require("cheerio");
let singleFile = require("./single");
const { fn } = require("./single");
 let url ="https://www.espncricinfo.com/team/chennai-super-kings-335974/match-results";
function allMatches(url,dest)
{
    request(url,cb);
    function cb(err,response,html)
    {
        if(err)
        console.log(err);

        let chSelector = cheerio.load(html);

        let allmatch=chSelector(".container-fluid.p-0 .row.no-gutters .col-md-8.col-16")
        // console.log(allmatch.length);
        for(let i=0;i<allmatch.length;i++){
        let sctable = chSelector(allmatch[i]).find(".match-cta-container a")[2];
        // console.log(sctable.length);
        let link = chSelector(sctable).attr("href");
        // console.log(link);
        let finallink = "https://www.espncricinfo.com"+link;
        // console.log(finallink);
        singleFile.fn(finallink,dest)
        // console.log(dest);
        }
    }
}
// allMatches(url,"");
module.exports={
    fn:allMatches
}