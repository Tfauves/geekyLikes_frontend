import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../Providers/AuthProvider';
import Spinner from '../faCommon/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Developer from './Developer';

const Developers = (props) => {
  const [auth] = useContext(AuthContext)
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const host = process.env.REACT_APP_API_HOST || "http://localhost:8080";
    const _getDevelopers = async () => {
      // setLoading(true);
      
      try {

        // const res = await axios.get(
        //   'http://localhost:8080/api/developers',
        const res = await axios.get(`${host}/api/developers`,

          {
            headers: {
              "Authorization": `Bearer ${auth.token}`
            }
          }
        )
        console.log(res.data)
        setLoading(false);
        setDevelopers(res.data);
      } catch (err) {
        console.log(err.response.message)
      }


    }
    setLoading(true);
    _getDevelopers();
  },[auth.token])

  const displayDevelopers = () => {
    //not calling the function, just sending it down
    return developers.map(dev => <Developer developer={dev} key={dev.id} onSelect={onSelect}/>)
  }

  const onSelect = (devId) => {
    navigate(`/developers/${devId}`)
  }

  return (
    <div style={{
      display: "flex",
      flex: "1",
      flexDirection: "column",
      alignItems: 'center',
      minHeight: '100vh',
    }}>
      <h1>Developers</h1>
      {loading ? 
        <Spinner /> 
      :
        displayDevelopers()
      }
    </div>
  )
}

export default Developers;