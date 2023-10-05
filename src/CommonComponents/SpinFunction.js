import { Typography } from '@mui/material';
import SpinnerLoader, { SubSpinner } from './LoadingSpinner';
import NotFound from './PageNotFound';

const checkDataAvailability = (isLoading,text,setIsLoading,buttonStatus,navigateTo)=>{

      if(!isLoading){
        
          setTimeout(() => {
            setIsLoading(true);
          }, 5000);
        
       
          return(
            <>
            
            <SpinnerLoader />
            
            </>
            
            
          );
          
      }else{
        return (
          <div>
              <NotFound error={text} buttonStatus={buttonStatus} />
          </div>
        );
      }

    }

    export const checkDataAvailabilityWithoutSetter = (isLoading,text,buttonStatus)=>{

      if(!isLoading){
        
          setTimeout(() => {
          }, 5000);
        
       
          return(
            <>
            
            <SpinnerLoader />
            
            </>
            
            
          );
          
      }else{
        return (
          <div>
              <NotFound error={text} buttonStatus={buttonStatus}/>
          </div>
        );
      }

    }

   export function LoadSubSpinner(isLoading,setIsLoading,text){

      if(!isLoading){
        
          setTimeout(() => {
            setIsLoading(true);
          }, 4000);
        
       
          return(
            <>
            
                <SubSpinner />
            
            </>
            
            
          );
          
      }else{
        return <>
          <Typography variant="h4" sx={{backgroundColor:"#F5F5F5",padding:'20px',borderRadius:'10px',textAlign:'center',alignItems:'center',marginTop:'50px'}}>{text}</Typography>
        </>;
      }

    }

    export function NoData(text){

    
        return <>
          <Typography variant="h4" sx={{backgroundColor:"#F5F5F5",padding:'20px',borderRadius:'10px',textAlign:'center',alignItems:'center',marginTop:'50px'}}>{text}</Typography>
        </>;
      

    }

    export default checkDataAvailability;