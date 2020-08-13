 import React,{useState,useEffect, Fragment, SyntheticEvent, useContext} from 'react';
import {Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from '../nav/NaVBar';
 
import ActivityStore from '../stores/ActivityStore';
import { LoadingComponent } from '../main/LoadingComponent';
import {observer} from 'mobx-react-lite';
import { Route,withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage  from '../main/HomePage';
import ActivityForm from '../main/ActivityForm';
import ActivityDashboard from '../dashboard/ActivityDashboard';

import ActivityDetails from '../main/ActivityDetails';




const App:React.FC<RouteComponentProps> =({location})=>{
  
 const activityStore = useContext(ActivityStore);  //importing from mobx store
 

 useEffect(()=>{
  activityStore.loadActivities();
 },[activityStore])
 
  
if(activityStore.loadingInitial){
  return <LoadingComponent content='loading activites....'/>
}


  
    return (
      <Fragment>
         <Route exact path='/' component={HomePage}/>
       
         <Route exact path={'/(.+)'} render={()=>(
         <Fragment>
           <NavBar  />
           
        <Container style={{marginTop: '7em'}}>
        <Route exact component={ActivityDashboard} path='/activities' /> 
       <Route exact component={ActivityDashboard} path='/activities' /> 
       <Route component={ActivityDetails} path='/activities/:id' /> 
       <Route key={location.key} component={ActivityForm} path={['/createActivity','/manage/:id'] }/>         
      </Container>
      
         </Fragment>

         )}/>
       

        
         
         </Fragment>
    );
      
    
  }
  


export default  withRouter(observer  (App));
