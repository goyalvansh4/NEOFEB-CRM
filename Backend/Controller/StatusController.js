const Status=require("../Models/Status")

const addStatus = async (req,res)=>{

    const {name,description} = req.body;
    

    try {
        await Status.create({
            name,
            description
           
        });
           
        
         let response = {status : "success" , msg : "Status create Successfuly"};
        res.json(response); 
    } catch (error) {
        console.log("error")
    }
    
    
    
    }

    const getStatus=async (req,res)=>{
    
    try {
        const data= await Status.find()
          
        let response = {status : "success" , msg : "Get Status Successfuly",data:data};
        res.json(response);
    } catch (error) {
        console.log("status not Found")
    }
       
    }


   
    
    const Statusdelete = async(req,res)=>{
        try {
            const status = await Status.findByIdAndDelete(req.params.id)
            const response = {status : 'success',msg : 'Status Deleted Sucessfully'};
            res.json(response);
        } catch (error) {
            console.log("Status not delete")
        }
        
    }





    const Statusupdate = async (req, res) => {
        try {
          
            const {name,description} = req.body;
    
      
        
          const data = {
            name,
            description
            
          };
      
        
          const status = await Status.findByIdAndUpdate(req.params.id, data, { new: true });
      
          
          if (!status) {
            return res.status(404).json({ status: 'error', msg: 'Status not found' });
          }``
      
          res.json({ status: 'success', msg: 'Status updated successfully', status});
          
        } catch (error) {
          res.status(500).json({ status: 'error', msg: 'Server error', error: error.message });
        }
      };

    module.exports={addStatus,getStatus,Statusdelete,Statusupdate};