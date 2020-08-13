import React, { SyntheticEvent, useContext } from 'react'
import { Item,  Button, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../models/activity'
import { observer } from 'mobx-react-lite';
import ActivityStore from '../stores/ActivityStore';
import { Link } from 'react-router-dom';
import ActivityListItem from './ActivityListItem';

const ActivityList :React.FC=() => {
    const activityStore=useContext(ActivityStore);
    const {activitiesBDate,selectActivity,deleteActivity,submitting,target}=activityStore
    return (
        <Segment>
            <Item.Group divided>
                {activitiesBDate.map(activity=>(
                  <ActivityListItem key={activity.id} activity={activity}/>
                ))}
    

   
  </Item.Group>
        </Segment>
        
    )
};

export default observer(ActivityList);
