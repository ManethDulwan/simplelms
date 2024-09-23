'use client'
import { useState } from "react";

export default function Update(){
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 


        try {
            const response = await fetch('http://localhost:5038/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id:id, name:name, grade:grade}),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Student added:', result);
                setId('');
                setName('');
                setGrade('');
            } else {
                console.error('Error adding student:', response.statusText);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };
    return (
        <div className="flex justify-center items-center">
            <div className="border rounded-[25px] p-14 mt-20">
                <h1 className="text-center font-bold">Update Students</h1>
                <input value={id} onChange={(e) => setId(e.target.value)}  type="text" placeholder="ID" className="p-2 rounded-[25px] border mt-5 mb-5"/><br />
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" className="p-2 rounded-[25px] border mt-5 mb-5"/><br />
                <input value={grade} onChange={(e) => setGrade(e.target.value)} type="text" placeholder="Grade" className="p-2 rounded-[25px] border mt-5 mb-5"/><br />
                <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-[25px]">Update Student</button>
            </div>
        </div>
    );
}