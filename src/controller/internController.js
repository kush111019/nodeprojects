const collegeModel = require('../models/collegeModel')
const internModel=require("../models/internModel")
const validator = require('../validators/validator')
const { default: mongoose } = require("mongoose");
const express=require("express")
const object_id=mongoose.Types.ObjectId



const createIntern=async function(req,res){
try{
     const data=req.body;

      if(!validator.isValidRequestBody(data)){
       
          return res.status(400).send({status:false,msg:"send the data first"})
      }

      
      let internMobile=data.mobile;
      let internEmail=data.email;
      let internName=data.name;
      let internCollegeName=data.collegeName;
    
     
      if(!validator.isValidMobileNumber(internMobile)){
      return res.status(400).send({status:false,msg:"mobile is missing"})
      }
     
      if(!validator.isValidEmail(internEmail)){
         return res.status(400).send({status:false,msg:"email is missing"});
     }

     if(!validator.isValid(internName)){
         return res.status(400).send({status:false,msg:"intern name is missing"})
     }
   
     if(!validator.isValid(internCollegeName)){
        return res.status(400).send({status:false,msg:"college name is missing"})
      }
 
      let collegeFetched=await collegeModel.findOne({name:internCollegeName})
    
    
      if(!collegeFetched){
          return res.status(400).send({status:false,msg:"invalid college name"})
      }
      
      let emailAlreadyExist=await internModel.findOne({email:internEmail,isDeleted:false})
      
      if(emailAlreadyExist)
      {
          
          return res.status(400).send({status:false,msg:"email already exists"})
      }

      let mobileAlreadyRegistered=await internModel.findOne({mobile:internMobile,isDeleted:false})
      if(mobileAlreadyRegistered){
          return res.status(400).send({status:false,msg:"mobile already registred"})
      }
        
     let requiredRecord=await internModel.create(data);
     if(requiredRecord)
     res.status(201).send({status:true,data:requiredRecord})
    }catch(err){

        console.log("this is the error", error)
        res.status(500).send({ status: false, msg: error.message })

    }
    
}



module.exports.createIntern=createIntern;