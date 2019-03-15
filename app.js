var request = require("request"),
    
    fs = require("fs"),
    cheerio = require("cheerio"),
    url = "http://es.bitcoin-method.com/members.php";

request(url, function (error, response, body) {
    if (!error) {
        var $page = cheerio.load(body);    
            // 
            // 
            // profit1_title = $page("div#xyz>div.container>div.profit1>p").html();

            fs.readFile('vocabulary_en.json', 'utf8', function (err, data) {
                if (err) throw err;
                const json = JSON.parse(data);
                
                json.PROFIT1.TITLE  = $page("div#xyz>div.container>div.profit1>p").html();
                json.METHOD.METHOD_TITLE = $page("div.an_other>div.bod>div.container>div.method>h3").html();
                json.READ.FIRST_SLOGAN  = $page("div.an_other>div.bod>div.container>div.read>p").eq(0).html();
                json.READ.SECOND_SLOGAN  = $page("div.an_other>div.bod>div.container>div.read>p").eq(1).html();
                json.READ.READ_ADD1  = $page("div.an_other>div.bod>div.container>div.read>div.add").eq(0).children('p').html();

                fs.writeFile('vocabulary_en.json', JSON.stringify(json, null, 2), 'utf8', (error) => {
                  if (error) {
                    console.log(error);
                  }
                });
              });

 
         
        // fs.writeFile("pars.txt", read_first_slogan, function(error){
 
        //     if(error) throw error; // если возникла ошибка
        //     console.log("Асинхронная запись файла завершена. Содержимое файла:");
        //     //let data = fs.readFileSync("hello.txt", "utf8");
        //     //console.log(data);  // выводим считанные данные
        // });
    } else {
        console.log("Произошла ошибка: " + error);
    }
});