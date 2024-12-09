const Hsn = require("../Models/Hsn")

const addHsn = async (req,res)=>{ 
    const {hsn,percent} = req.body;
    const data = await Hsn.create({
        hsn,
        percent
    });
    let response = {status : "success",data:data , msg : "Register Hsn Successfuly"};
    res.json(response);
}

const getHsn =async (req,res)=>{
    const data= await Hsn.find()
    let response = {status : "success" , msg : "Get Hsn Successfuly",data:data};
    res.json(response);
}
       

const Hsndelete=async (req,res)=>{
    const hsn=await Hsn.findByIdAndDelete(req.params.id)
    const response = {status : 'success',data:hsn,msg : 'DELETE Data Sucessfully'};
    res.json(response);
}

module.exports={addHsn,getHsn,Hsndelete}