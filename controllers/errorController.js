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
            return {error:"Database error"};
        }
    }
    getDeleteError(deleteObj){
        if(deleteObj === 0){return({deleted:deleteObj,message:"Can not delete item"});} 
        else{
        return ({deleted:deleteObj,message:"Deleted item succes"});
        }
        
    }

    getPassportError(error)
    { 
        var defaultMessage ="Authentication Error";
        switch(error.name) {
            case 'AuthenticationError':
                return {type:'authentication',status:error.status,message:error.message,customMessage:"You are not authorized, please check your credentials"};
                break;
            default:
            error?defaultMessage=error.message:defaultMessage="Authentication Error"
            return {error:defaultMessage};
        }
    }
         
}
 
module.exports = errorController;