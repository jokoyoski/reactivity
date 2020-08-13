import React, { useContext } from 'react'
import { Item,  Button, Label, Segment, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite'
import ActivityStore from '../stores/ActivityStore';
import { IActivity } from '../models/activity';



 const ActivityListItem:React.FC<{activity:IActivity}> = ({activity}) => {
    const activityStore=useContext(ActivityStore);
    const {activitiesBDate,selectActivity,deleteActivity,submitting,target}=activityStore
    return (
        <Segment.Group>
           <Segment>
           <Item key={activity.id}>
        <Item.Image size='tiny' circular src='/assets/user.png' />

    <Item.Content>
      <Item.Header as='a'>{activity.title}</Item.Header>
      <Item.Meta>{activity.date}</Item.Meta>
      <Item.Description>
       <div>
           {activity.description}
       </div>
       <div>
           {activity.city},{activity.venue}
       </div>
      
      </Item.Description>
     
    
    </Item.Content>
  </Item>
               </Segment> 
               <Segment>
                   <Icon name='clock'/>{activity.date}
                   <Icon name='marker'/>{activity.venue},{activity.city}
               </Segment>
               <Segment secondary>
                   Attendees will go here
               </Segment>
               <Segment clearing>
       <span>{activity.description}</span>
       <Button as={Link} to={`/activities/${activity.id}`}  onClick={()=>selectActivity(activity.id)} floated='right' content='View' color='blue'/>
     
                   </Segment>
        </Segment.Group>
        
    )
}


export default ActivityListItem