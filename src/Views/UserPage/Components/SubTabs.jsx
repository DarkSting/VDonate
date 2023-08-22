import { Functions } from '@mui/icons-material';
import React,{useState} from 'react';
import { ListItem, ListItemButton, ListItemText, Stack, Box,List, Typography } from '@mui/material';


{/*properties of elements */}
const ListButtonProp =(props)=>{

    return {
     
     '&.Mui-selected':{borderBottom:'solid 2px white',color:props.bordeColor,backgroundColor:'white',fontWeight:'bold',},
     
    '&:hover':{
        backgroundColor:props.bordeColor,
        color:"white",
    },

    '&.Mui-selected:hover':{
        borderRadius:'0px',
        backgroundColor:props.bordeColor,
    }
,
    color:'white',
    borderBottom:'solid 2px white',
   width:{
    xs:'auto',
    md: '100px',
    lg:'200px'
   }
   
   }
}

const renderComponent =(selectedItems,tabs,selectedItem)=>{


    for(let i=0;i<selectedItems.length;i++){
        if(selectedItems[i]===selectedItem){
            return(tabs[i]);
        }
    }
   
}

{/* use this to create subtabs inside a tab */}
export default function Content(prop){

    const [selectItem,setSelectItem] = useState(prop.selectedItems[0]);

    return(
    <Stack spacing={1}>
        <Box direction="row" sx={{display:'flex',alignItems:'center',flexDirection:'column'}}>

            <List sx={{display:'flex',direction:'row'}}>
                {prop.selectedItems.map((current)=>(

                        <ListItem>
                            <ListItemButton selected={selectItem==current} onClick={()=>{setSelectItem(current)}} sx={ListButtonProp(prop.props)}>
                                <ListItemText primary={current} sx={{textAlign:'center'}}>
                                   {current}
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                )
            ) }
            </List>

        </Box>
        <Box sx={{display:'flex',justifyContent:'center'}}>
                    {renderComponent(prop.selectedItems,prop.tabs,selectItem)}
        </Box>



    </Stack>
    );


}