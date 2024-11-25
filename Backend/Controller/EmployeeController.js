const Employee = require('../Models/Employee');


const addEmployee = async (req,res)=>{

const {name,position,email,status} = req.body;


await Employee.create({
    name,
    position,
    email,
    status
});
   
 
 let response = {status : "success" , msg : "Register Employee Successfuly"};
res.json(response);

}


const getEmployee =async (req,res)=>{

    const data= await Employee.find()
    let response = {status : "success" , msg : "Get Employee Successfuly",data:data};
     res.json(response);
}



const getEmployeebyid = async(req,res)=>{
    const employee= await Employee.findById(req.params.id)
 
       console.log(employee);
       let response = {status : "success" , msg : "Get Client Successfuly",data:data};
       res.json(response);
    
 }

 const Employeedelete=async (req,res)=>{
    const employee=await Employee.findByIdAndDelete(req.params.id)
    const response = {status : 'success',msg : 'DELETE Data Sucessfully'};
    res.json(response);
}


const Employeeupdate = async (req, res) => {
    try {
      
      const { name, position, email, status } = req.body;
  
    
      const data = {
        name,
        position,
        email,
        status
      };
  
    
      const employee = await Employee.findByIdAndUpdate(req.params.id, data, { new: true });
  
      
      if (!employee) {
        return res.status(404).json({ status: 'error', msg: 'Employee not found' });
      }
  
      res.json({ status: 'success', msg: 'Data updated successfully', employee });
      
    } catch (error) {
      res.status(500).json({ status: 'error', msg: 'Server error', error: error.message });
    }
  };
  
 


module.exports = {addEmployee,getEmployee,getEmployeebyid,Employeedelete,Employeeupdate};