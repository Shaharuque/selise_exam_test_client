import React, { useState } from 'react';

interface ItemProps {
  team: ITeam;
  handleTeamSelected: (team: ITeam) => void;
}

interface ITeam {
  id: number;
  name: string;
  flagUrl: string;
}

const Team: React.FC<ItemProps> = ({ team, handleTeamSelected }) => {
  const [selected, setSelected] = useState(false);

  const chooseTeam = () => {
    if (!selected) {
      if (handleTeamSelected) {
        handleTeamSelected(team); 
      }
      setSelected(true);
    }
  };

  return (
    <div>
      <div
        onClick={chooseTeam}
        className={`m-2 p-2 text-white ${selected ? 'selected' : ''}`}
      >
        <img src={team.flagUrl} className='h-[200px] w-[300px]' alt='country flag' />
        <h1>{team.name}</h1>
      </div>
    </div>
  );
};

export default Team;
