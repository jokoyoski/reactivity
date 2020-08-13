import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../models/activity'
import {v4 as uuid} from 'uuid';
import ActivityStore from '../stores/ActivityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import agent from '../app/api/agent';

interface DetailParams{
    id:string
}
 const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
    const activityStore = useContext(ActivityStore);
    const{activity,editActivity,cancelFormOpen,submitting,loadActivty,clearActivity}=activityStore;
    useEffect(() => {
       if(match.params.id){
        agent.Activities.details(match.params.id).then(
            (activity:IActivity)=>{
               activity && setActivity(activity)
            }
       
        )}
        return ()=>{
            clearActivity()
        }
    }, [loadActivty,match.params.id,clearActivity,activity])
   
   const [activityInfo,setActivity]=useState<IActivity>( {
    id:'',
    title:'',
    category:'',
    description:'',
    date:'',
    city:'',
    venue:''
})
   const handleInputChange=(event:FormEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
       const{name,value}=event.currentTarget;
      
       setActivity({...activityInfo,[name]:value})
   }
   
   const handleSubmit=()=>{
       
  if(activityInfo.id.length===0){
      let newActivity={
          ...activityInfo,
          id:uuid()  
      }
      activityStore.createActivity(newActivity).then(()=>history.push(`/activities/${newActivity.id}`));
  }else{
      editActivity(activityInfo).then(()=>history.push(`/activities/${activityInfo.id}`));
  }
   }
    return ( 
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} name='title' placeholder='Title' value={activityInfo.title}/>
                <Form.TextArea rows={2} onChange={handleInputChange} name='description' placeholder='Description' value={activityInfo.description}/>
                <Form.Input placeholder='Category' onChange={handleInputChange} name='category' value={activityInfo.category}/>
                <Form.Input  type='datetime-local' onChange={handleInputChange} name='date' value={activityInfo.date} placeholder='Date'/>
                <Form.Input value={activityInfo.city} onChange={handleInputChange} name='city' placeholder='City'/>
                <Form.Input value={activityInfo.venue} onChange={handleInputChange} name='venue' placeholder='Venue'/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={()=>cancelFormOpen()} floated='right'  type='button' content='Cancel'/>    
            </Form>
        </Segment>
    )
}
export default observer(ActivityForm);