import React from 'react';

const Test:React.FC = () => {
    const cards:Array<{id:number,name:string}>=[
        {id:1,name:'card1'},
        {id:2,name:'card2'},
        {id:3,name:'card3'},
        {id:4,name:'card4'},
        {id:5,name:'card5'},
        {id:6,name:'card6'},
    ]
    return (
        <div className='h-[100vh] w-[100vw] p-[100px]'>
            <h1 className='text-center'>Home</h1>
            <div className='grid grid-cols-1 2xl:grid-cols-2 h-[300px] overflow-y-scroll'>
                {cards.map((card)=>(
                    <div className='bg-white  m-2 p-2 rounded shadow-lg h-[200px]' key={card.id}>
                        <h1>{card.name}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Test;