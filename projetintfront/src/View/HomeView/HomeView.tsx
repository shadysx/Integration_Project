import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

function HomeView() {
    const { user } = useContext(AuthContext);
  return (
    <>
        <div>HomeView</div>
        <div>{user.name}</div>
    </>
     )
}

export default HomeView