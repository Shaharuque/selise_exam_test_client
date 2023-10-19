import React from 'react';
import { useSelector } from 'react-redux';

const Toss = () => {
    const reduxResponse=useSelector((state:any)=>state.selectedTeam)
    console.log(reduxResponse)
    return (
        <div>
            <h1 className='text-black text-center h-[100vh] w-[100vw]'>Toss</h1>
        </div>
    );
};

export default Toss;