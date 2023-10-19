import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Team from '../components/Home/Team';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { teamsHandler } from '../features/selectTeam/selectTeamSlice';


interface ITeam {
    id: number;
    name: string;
    flagUrl: string;
}

const Home: React.FC = () => {
    const [teams, setTeams] = useState<ITeam[]>([])
    const [selectedTeams, setSelectedTeams] = useState<ITeam[]>([]);
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const cards: Array<{ id: number, name: string }> = [
        { id: 1, name: 'card1' },
        { id: 2, name: 'card2' },
        { id: 3, name: 'card3' },
        { id: 4, name: 'card4' },
        { id: 5, name: 'card5' },
        { id: 6, name: 'card6' },
    ]



    const handleTeamSelected = (team: ITeam) => {
        // Limit the selection to two teams
        if (selectedTeams.length < 2) {
            setSelectedTeams([...selectedTeams, team]);
            dispatch(teamsHandler(team))
        } else {
            alert('You can select only two teams')
        }
    };

    console.log(selectedTeams)

    useEffect(() => {
        const fetchTeams = async () => {
            const response = await axios.get('https://selise-json-server.onrender.com/teams');
            setTeams(response.data)
        }
        fetchTeams();
    }, [])

    console.log(teams)

    return (
        <div className={`w-[100vw] h-[100vh] overflow-hidden px-[200px]`}>
            <h1 className='text-center'>Home</h1>
            <div className='grid grid-cols-2 2xl:grid-cols-3 h-[500px] 2xl:overflow-hidden overflow-y-scroll '>
                {teams?.map((team) => (
                    <Team key={team.id} team={team} handleTeamSelected={handleTeamSelected} />
                ))}
            </div>

            <div className='flex justify-center'>
                {
                    selectedTeams.length ==2 &&  <button onClick={()=>{navigate('/toss')}} className='bg-red-500 p-2 rounded text-white'>Toss</button>
                }
               
            </div>
        </div>
    );
};

export default Home;