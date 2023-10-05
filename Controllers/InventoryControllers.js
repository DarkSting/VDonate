const {InventoryModel} = require('../Models/InventoryModel');


//adding a user model to the database
const addInventory = async(req,res)=>{
    const{
        bloodUnits,
        category,
        donations,
       
    } = req.body

   try{

    var newInventory = new InventoryModel({
        bloodUnits:bloodUnits,
        category:category,
        donations:donations
        
    })

    const result = await newInventory.save()
    return res.status(201).json(result);

   }
   catch(error){
    return res.status(500).json(error);
   }
    
    

}

const findAllInventories = async(req,res,next)=>{

    await InventoryModel.find({}).then(result=>{
       return res.status(201).json(result);
    }).catch(error=>{
       return res.status(500).json(error)
    });


}

const findinventory = async(req,res,next)=>{

    const{
        checkedBy,
        refNo
 
    } = req.body


   await ComplainModel.findOne({$or:[{refNo:refNo},{checkedBy:checkedBy}]}).then(result=>{
    return res.status(201).json(result);
   }).catch(error=>{

    return res.status(500).json(error);
   });

}


const updateInventory = async(req,res,next)=>{

      const{ 

        checkedBy,
        refNo,
        updatedDes,

    } = req.body;

        const errors = [];

        if(updatedDes!==undefined){
            console.log(updatedName)
            await ComplainModel.findOneAndUpdate({$or:[{refNo:refNo},{checkedBy:checkedBy}]},{description:updatedDes}).then(result=>{
                console.log(result)
            }).catch(
                err =>{
                    return res.status(201).json(err.message);
                }
            )
        }
    
        
        
}

module.exports  = {
    
    addInventory,
    updateInventory,
    findAllInventories,
    findinventory

};

