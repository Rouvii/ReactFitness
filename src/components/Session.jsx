import {useState,useEffect} from "react"
import styled from "styled-components"





function Session() {
    const [sessions, setSessions] = useState([])

    useEffect(() => {
        fetch("https://rouvii.dk/api/sessions")
        .then((response) => response.json())
        .then((data) => setSessions(data))
    }, []);


    return ( 
        <>
        <div>
            <ul>
                {sessions.map((session) => (
                    <li key={session.id}>
                    <h2></h2>
                    
                    
                    
                    </li>
                        
                        
                        
                        
                ))}
            </ul>
        </div>
        
        </>
     );
}

export default Session;