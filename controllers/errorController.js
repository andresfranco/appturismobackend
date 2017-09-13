class errorController{
   getOrmError(error){
        switch(error.name) {
            case 'SequelizeValidationError':
                return {type:'validation',error:error.errors};
                break;
            case 'SequelizeDatabaseError':
                return {
                type:'database'
                ,error:"SequelizeDatabaseError-"+error.parent.name +"-"+ error.parent.severity+"-"+error.parent.code+"-"+error.parent.routine
                ,errorMessage:"Internal Database error: Please contact your system administrator"};
                break;
            default:
            return error;
        }
    }
    getDeleteError(deleteObj){
        if(deleteObj === 0){return({deleted:deleteObj,message:"Can not delete item"});} 
        else{
        return ({deleted:deleteObj,message:"Deleted item succes"});
        }
        
    }
         
}
 
module.exports = errorController;