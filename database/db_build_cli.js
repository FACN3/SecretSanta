const runDbBuild = require('./db_build');

runDbBuild((err,res) => {
  if(err){
    throw err;
  }else{
    console.log('your db was built');
  }
})
