import React, { Fragment } from 'react'
import { Container } from 'semantic-ui-react'
import { NavBar } from '../nav/NaVBar'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'

 const HomePage = () => {
    return (
       
        <Container style={{marginTop:'7em'}}>
            
              <h1>Hello</h1>
              <h3>Go To<Link to='/activities'>Activities</Link></h3>
            
        </Container>
    )
}

export default observer(HomePage);