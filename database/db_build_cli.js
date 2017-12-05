const building = require('./db_build');

building((err,res)=>{
  if(err){
    throw err;
  }else{
    console.log('your db was built');
  }
})
