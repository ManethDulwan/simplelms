'use client'
import { useState } from "react";

export default function Delete(){
    const [id, setId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await fetch('http://localhost:5038/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id:id, }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Student added:', result);
                setId('');
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
                <h1 className="text-center font-bold">Delete Students</h1>
                <input value={id} onChange={(e) => setId(e.target.value)}  type="text" placeholder="ID" className="p-2 rounded-[25px] border mt-5 mb-5"/><br />
                <button onClick={handleSubmit} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[25px]">Delete Student</button>
            </div>
        </div>
    );
}