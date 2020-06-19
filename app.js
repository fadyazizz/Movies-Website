var express = require('express');
var fs=require('fs');
var session=require('express-session');

var needed_registration=false;



var path = require('path');
var app = express();
app.use(session({secret: 'mesh ha2olak'}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

/*
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });  
*/


app.get('/',function(req,res,next){
  if(needed_registration==false){
  res.render('login',{from: "/"});
  }
  else{
    // we pressing back it will display scuccesful... if we did not set needed_registeration to false
    needed_registration=false;
    res.render('login',{from:"register"});
  }
});
// the info is stored in req

app.post('/',function(req,res,next){
  var dataBase=fs.readFileSync('DataBase.json','utf8');

req.session.username=req.body.username;
req.session.password=req.body.password;


var y=JSON.parse(dataBase);
var found=false;
for(var i=0;i<y.length;i++){
  
if(y[i].Username==req.session.username && y[i].PassWord==req.session.password){
  res.render('home',{title: 'Express'});
  found=true;
  

  break;
}
}
if(!found){
  res.render('login',{from:"wrong_username_or_password"});
}

  
});




app.get('/registration',function(req,res,next){

res.render('registration',{fo:false});

});
app.post('/register',function(req,res,next){
  var dataBase=fs.readFileSync('DataBase.json','utf8');
  var user=req.body.username;
  var pass=req.body.password;
  var empty=false;
  if(user=="" || pass==""){
    empty=true;
    res.render('registration',{fo:"empty"})
  }
  var data=JSON.parse(dataBase);
  var found=false;
  for(var i=0;i<data.length && empty==false;i++){
    if(user==data[i].Username){
      res.render('registration',{fo:"true"});
      found=true;
      break;

    
    }
  }
  
  if(!found && empty==false){
    data.push({Username: user,PassWord:pass,WatchList:[]});
    // converting back the data to json to be put written in the file
    var to_be_written=JSON.stringify(data);
    fs.writeFile('DataBase.json',to_be_written,'utf8',function(err) {
      if (err) throw err;
      
      });
      needed_registration=true;
    res.redirect('/');
   


  }
  });

app.get('/register',function(req,res,next){

  res.render('home',{title: 'Express'});
  
  });
//all action movies
app.get('/action',function(req,res,next){


  res.render('action',{title: 'Express'});

});
app.get('/fightclub',function(req,res,next){


  res.render('fightclub',{found: "false"});

});

app.post('/fightclub',function(req,res,next){
  
  var found=false;
  var dataBase=fs.readFileSync('DataBase.json','utf8');
  var y=JSON.parse(dataBase);
  
  var index_in_usersdatabase;
  for(var i=0;i<y.length;i++){
    if(y[i].Username==req.session.username){
      console.log("I came heresrfxgxfx");
      index_in_usersdatabase=i;
      for(var j=0;j<y[i].WatchList.length && found==false;j++){
        if("fightclub"==y[i].WatchList[j]){
          found=true;
          
        }
      }
      break;
    }
  }
  if(!found){
  y[index_in_usersdatabase].WatchList.push("fightclub");
  var to_be_written=JSON.stringify(y);
  fs.writeFile('DataBase.json',to_be_written,'utf8',function(err) {
    if (err) throw err;
    
    });
  }
  else{
    res.render('fightclub',{found:"true"});
  }
  
  });



app.get('/darkknight',function(req,res,next){


  res.render('darkknight',{found: "false"});

});


app.post('/darkknight',function(req,res,next){
  
  var found=false;
  var dataBase=fs.readFileSync('DataBase.json','utf8');
  var y=JSON.parse(dataBase);
  
  var index_in_usersdatabase;
  for(var i=0;i<y.length;i++){
    if(y[i].Username==req.session.username){
      console.log("I came heresrfxgxfx");
      index_in_usersdatabase=i;
      for(var j=0;j<y[i].WatchList.length && found==false;j++){
        if("darkknight"==y[i].WatchList[j]){
          found=true;
          
        }
      }
      break;
    }
  }
  if(!found){
  y[index_in_usersdatabase].WatchList.push("darkknight");
  var to_be_written=JSON.stringify(y);
  fs.writeFile('DataBase.json',to_be_written,'utf8',function(err) {
    if (err) throw err;
    
    });
  }
  else{
    res.render('darkknight',{found:"true"});
  }
  
  });



//all Horror movies
app.get('/horror',function(req,res,next){
  res.render('horror',{title:'Express'});
}
);
app.get('/scream',function(req,res,next){
  res.render('scream',{found: "false"});
}
);

app.post('/scream',function(req,res,next){
  
  var found=false;
  var dataBase=fs.readFileSync('DataBase.json','utf8');
  var y=JSON.parse(dataBase);
  
  var index_in_usersdatabase;
  for(var i=0;i<y.length;i++){
    if(y[i].Username==req.session.username){
      console.log("I came heresrfxgxfx");
      index_in_usersdatabase=i;
      for(var j=0;j<y[i].WatchList.length && found==false;j++){
        if("scream"==y[i].WatchList[j]){
          found=true;
          
        }
      }
      break;
    }
  }
  if(!found){
  y[index_in_usersdatabase].WatchList.push("scream");
  var to_be_written=JSON.stringify(y);
  fs.writeFile('DataBase.json',to_be_written,'utf8',function(err) {
    if (err) throw err;
    
    });
  }
  
  else{
    res.render('scream',{found:"true"});
  }
  });








app.get('/conjuring',function(req,res,next){
  res.render('conjuring',{found: "false"});
}
);

app.post('/conjuring',function(req,res,next){
  
  var found=false;
  var dataBase=fs.readFileSync('DataBase.json','utf8');
  var y=JSON.parse(dataBase);
  
  var index_in_usersdatabase;
  for(var i=0;i<y.length;i++){
    if(y[i].Username==req.session.username){
      console.log("I came heresrfxgxfx");
      index_in_usersdatabase=i;
      for(var j=0;j<y[i].WatchList.length && found==false;j++){
        if("conjuring"==y[i].WatchList[j]){
          found=true;
          
        }
      }
      break;
    }
  }
  if(!found){
  y[index_in_usersdatabase].WatchList.push("conjuring");
  var to_be_written=JSON.stringify(y);
  fs.writeFile('DataBase.json',to_be_written,'utf8',function(err) {
    if (err) throw err;
    
    });
  }
  else{
    res.render('conjuring',{found:"true"});
  }
  
  });

app.post('/searchresults',function(req,res,next){
  res.render('horror',{title:'Express'});
}
);
//drama
app.get('/drama',function(req,res,next){
  res.render('drama',{title:'Express'});
}
);
app.get('/godfather',function(req,res,next){
  res.render('godfather',{found: "false"});
}
);


app.post('/godfather',function(req,res,next){
  
  var found=false;
  var dataBase=fs.readFileSync('DataBase.json','utf8');
  var y=JSON.parse(dataBase);
  
  var index_in_usersdatabase;
  for(var i=0;i<y.length;i++){
    if(y[i].Username==req.session.username){
      console.log("I came heresrfxgxfx");
      index_in_usersdatabase=i;
      for(var j=0;j<y[i].WatchList.length && found==false;j++){
        if("godfather"==y[i].WatchList[j]){
          found=true;
          
        }
      }
      break;
    }
  }
  if(!found){
  y[index_in_usersdatabase].WatchList.push("godfather");
  var to_be_written=JSON.stringify(y);
  fs.writeFile('DataBase.json',to_be_written,'utf8',function(err) {
    if (err) throw err;
    
    });
  }
  else{
    res.render('godfather',{found:"true"});
  }
  });




app.get('/godfather2',function(req,res,next){
  res.render('godfather2',{found: "false"});
}
);
app.post('/godfather2',function(req,res,next){
  
  var found=false;
  var dataBase=fs.readFileSync('DataBase.json','utf8');
  var y=JSON.parse(dataBase);
  
  var index_in_usersdatabase;
  for(var i=0;i<y.length;i++){
    if(y[i].Username==req.session.username){
      console.log("I came heresrfxgxfx");
      index_in_usersdatabase=i;
      for(var j=0;j<y[i].WatchList.length && found==false;j++){
        if("godfather2"==y[i].WatchList[j]){
          found=true;
          
        }
      }
      break;
    }
  }
  if(!found){
  y[index_in_usersdatabase].WatchList.push("godfather2");
  var to_be_written=JSON.stringify(y);
  fs.writeFile('DataBase.json',to_be_written,'utf8',function(err) {
    if (err) throw err;
    
    });
  }

  else{
    res.render('godfather2',{found:"true"});
  }
  
  });

  


app.get('/watchlist',function(req,res,next){
  var watch_list_of_user;
  var dataBase=fs.readFileSync('DataBase.json','utf8');
  var data=JSON.parse(dataBase);

  for(var i=0;i<data.length;i++){
    console.log(req.session.username);
    if(req.session.username==data[i].Username){
      console.log("I was here12");
      watch_list_of_user=data[i].WatchList;
      break;
    }
  }
  for(var i=0;i<watch_list_of_user.length;i++){
    watch_list_of_user[i]="/"+watch_list_of_user[i];
    console.log(watch_list_of_user[i]);
  }
  
  res.render('watchlist',{movie_name:watch_list_of_user});

}
);

//search


// app.post('/search',function(req,res,next){
//   //getting the word to be searched 
//   var search_word=req.body.Search;
//   // all names in the movie database are written in lower case
//   search_word=search_word.toLowerCase();
//   // searching for the word in the data base
//   var found=false;
//   var dataBase=fs.readFileSync('MovieDatabase.json','utf8');
//   var data=JSON.parse(dataBase);
//   for(var i=0;i<data.length;i++){
//     if(data[i]==search_word){
//       found=true;
//       break;
//     }
//   }
//   if(!found){
//     res.render('searchresultserr');
//   }
//   else{
//     search_word="/"+search_word;
//     res.render('searchresults',{movie_name:search_word});
//   }

  
//   });


app.post('/search',function(req,res,next){
  //getting the word to be searched 
  var search_word=req.body.Search;
  // all names in the movie database are written in lower case
  search_word=search_word.toLowerCase();
  // searching for the word in the data base
  var found=false;
  var dataBase=fs.readFileSync('MovieDatabase.json','utf8');
  var data=JSON.parse(dataBase);
  var searchArray =[];
  for(var i=0;i<data.length;i++){
    if(data[i].includes(search_word)){
     searchArray.push(data[i]);
      found=true;
    }
  }
  if(!found){
    res.render('searchresultserr');
  }
  else{
    search_word="/"+search_word;
    res.render('searchresults',{movie_name:searchArray});
  }

  
  });






if(process.env.PORT){
    app.listen(process.env.PORT);
}
else{
app.listen(3000)
}




module.exports = app;
