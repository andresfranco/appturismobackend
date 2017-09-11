var models = require('../models/index');
var generalController =require('../controllers/generalController');
var Country = models.Country;
var general =new generalController();

class countryController{

    constructor(){
        this.valid =false; 
        this.errorMessages=[];  
        this.Errors={};
    }
    getAll(req,res){
        Country.findAll({}).then(countries=>{ 
        res.json(countries);
        });
    }
    create(req,res){
        this.Errors = this.validateParameters(req);
        if(this.Errors.valid)
        {
            Country.create(req.body)
            .then(country => {
              country!==null?res.json(country):res.json({code:0,error:"Country not created"});
            }).error(function(err){
                 res.json(err);
            });
        }else{

            res.json(this.Errors);
        }
        
    }

    update(req,res){
        Country.findById(req.params.id)
          .then(country => {
            if (!country){res.json({code:0,error:"Country not found"})};
            
            this.Errors = this.validateParameters(req);
            if(this.Errors.valid)
                {
                    country.updateAttributes(req.body);
                    res.json(country);
                }else{
                    res.json(this.Errors);
                }

          }).error(function(err){
              res.json(err);
          });
    }

    delete(req,res){
        Country.destroy({  
            where:{id:req.params.id} 
          })
          .then(deletedCountry => {
            res.json({deleted:deletedCountry});
          }).error(function(err){
            res.json(err);
        });
      
    }
    show(req,res){
         Country.findById(req.params.id).then(country => {
            country!==null?res.json(country):res.json({code:0,error:"Country not found"});
          });
    }

    validateParameters(req){
    this.valid =false; 
    this.errorMessages=[];  
    this.Errors={};    
     var validParams={name:false,phonecode:false};
     req.body.name?validParams.name=true:this.errorMessages.push({code:0,field:"name",error:"name fields is required"});
     general.isPositiveInteger(req.body.phonecode)?validParams.phonecode=true:this.errorMessages.push({code:0,field:"phonecode",error:"phonecode has to be integer"});
     this.valid =validParams.name && validParams.phonecode;
     this.Errors={valid:this.valid,messages:this.errorMessages};
     return this.Errors;
    }

    
}
module.exports = countryController;


