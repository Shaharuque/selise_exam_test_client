import axios from 'axios';
import React,{useEffect, useState} from 'react';

const Home:React.FC = () => {
    const [teams,setTeams]=useState<[]>([])
    const cards:Array<{id:number,name:string}>=[
        {id:1,name:'card1'},
        {id:2,name:'card2'},
        {id:3,name:'card3'},
        {id:4,name:'card4'},
        {id:5,name:'card5'},
        {id:6,name:'card6'},
    ]

    useEffect(()=>{
        const fetchTeams=async()=>{
            const response=await axios.get('https://selise-json-server.onrender.com/teams');
            setTeams(response.data)
        }
        fetchTeams();
    },[])

    console.log(teams)

    return (
        <div className={`w-[100vw] h-[100vh] p-[100px] overflow-hidden`}>
            <h1 className='text-center'>Home</h1>
            <div className='grid grid-cols-1 2xl:grid-cols-2 h-[400px] overflow-y-scroll'>
                {cards.map((card)=>(
                    <div className='bg-white  m-2 p-2 rounded shadow-lg h-[200px]' key={card.id}>
                        <h1>{card.name}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;