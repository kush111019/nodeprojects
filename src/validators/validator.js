const mongoose=require('mongoose')
//validations checking function


const isValid=function(value){
 if(typeof value==='undefined'||value===null) return false
 if(typeof value ==='string' && value.trim().length===0) return false

 return true;
}

const isValidMobileNumber=function(mobile){
    if(typeof mobile === 'undefined' || mobile===null) return false
    if(typeof parseInt(mobile)==='Number' && parseInt(mobile).trim().length===0) return false
    if(mobile.length>10 && mobile.length<10) return false
    if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)) return false
    
     return true;
    }
    
const isValidRequestBody=function(requestBody){
    return Object.keys(requestBody).length>0
}

const isValidObjectId=function(ObjectId){
    return  mongoose.Types.ObjectId.isValid(ObjectId)
}

const isValidEmail=function(email){

    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) return false
    return true;
}


module.exports={isValid,isValidRequestBody,isValidObjectId,isValidMobileNumber,isValidEmail}