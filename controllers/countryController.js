var models = require('../models/index');
var generalController =require('../controllers/generalController');
var errorController =require('../controllers/errorController');
var Country = models.country;
var general =new generalController();
var dbErrors =new errorController();

class countryController{

    getAll(req,res){
        Country.findAll({}).then(countries=>{ 
        res.json(countries);
        });
    }
    create(req,res){
        Country.create(req.body)
        .then(country => {
            res.json(country);
        }).catch(function(err){
            res.json(dbErrors.getOrmError(err));
        });
    }

    update(req,res){
        Country.findById(req.params.id)
            .then(country => {
                if(country){
                    country.updateAttributes(req.body)
                    .then(updatedCountry => {
                        res.json(updatedCountry);
                    }).catch(function(err){
                        res.json(dbErrors.getOrmError(err));
                    });
                }
                else{
                  res.json({code:0,error:"Country not found"});
                }
            }).catch(function(err){
                res.json(dbErrors.getOrmError(err));
            });
    }

    delete(req,res){
        Country.destroy({  
            where:{id:req.params.id} 
          })
          .then(deletedCountry => { 
            res.json(dbErrors.getDeleteError(deletedCountry));
          }).catch(function(err){
            res.json(dbErrors.getOrmError(err));
        });
      
    }
    show(req,res){
         Country.findById(req.params.id).then(country => {   
            country!==null?res.json(country):res.json({code:0,error:"Country not found"});
        }).catch(function(err){
            res.json(dbErrors.getOrmError(err));
        });
    }
 
}
module.exports = countryController;


