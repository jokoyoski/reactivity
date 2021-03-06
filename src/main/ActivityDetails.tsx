import React, { useContext, useEffect } from 'react'
import {  Image, Card, Button } from 'semantic-ui-react'

import ActivityStore from '../stores/ActivityStore'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps, Link } from 'react-router-dom'
import { LoadingComponent } from './LoadingComponent'

interface DetailParams{
  id:string
}

 const ActivityDetails:React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
   const activityStore = useContext(ActivityStore);
   const{activity:selectedActivity,cancelSelectActivity,loadActivty,loadingInitial}=activityStore;
   useEffect(() => {
    
    loadActivty(match.params.id)
   },[loadActivty]) 
   if(loadingInitial ||!selectedActivity)return <LoadingComponent content='Loading Activity...'/>
  return (
        <Card fluid>
        <Image src={`/assets/categoryImages/${selectedActivity!.category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{selectedActivity!.title}</Card.Header>
          <Card.Meta>
            <span className='date'>{selectedActivity!.date}</span>
          </Card.Meta>
          <Card.Description>
            {selectedActivity!.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
         <Button.Group  widths={2}><Button as={Link} to={`/manage/${selectedActivity.id}`} basic color='blue' content="Edit"/><Button onClick={()=>history.push('/activites')} basic color='blue' content="Cancel"/></Button.Group>
         
        </Card.Content>
      </Card>
    )
}

export default observer(ActivityDetails)
