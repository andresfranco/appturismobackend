class generalController{
    isPositiveInteger(value) {
        return value == "0" || ((value | 0) > 0 && value % 1 == 0);
    }
}
 
module.exports = generalController;