const Source=require("../Models/Source")

const addSource = async (req,res)=>{

    const {name} = req.body;
    
    
    await Source.create({
        name
       
    });
       
    
     let response = {status : "success" , msg : "Source create Successfuly"};
    res.json(response);
    
    }

    const getSource=async (req,res)=>{

        const data= await Source.find()
          
     let response = {status : "success" , msg : "Get Source Successfuly",data:data};
     res.json(response);
       
    }


   
    
    const Sourcedelete = async(req,res)=>{
        const source = await Source.findByIdAndDelete(req.params.id)
        const response = {status : 'success',msg : 'Source Deleted Sucessfully'};
        res.json(response);
    }

    const Sourceupdate = async (req, res) => {
        try {
          
            const {name} = req.body;
    
      
        
          const data = {
            name
            
          };
      
        
          const source = await Source.findByIdAndUpdate(req.params.id, data, { new: true });
      
          
          if (!source) {
            return res.status(404).json({ status: 'error', msg: 'Source not found' });
          }``
      
          res.json({ status: 'success', msg: 'Source updated successfully', source });
          
        } catch (error) {
          res.status(500).json({ status: 'error', msg: 'Server error', error: error.message });
        }
      };

    module.exports={addSource,getSource,Sourcedelete,Sourceupdate};