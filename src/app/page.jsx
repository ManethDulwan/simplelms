'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [search,setsearch] = useState('');
  useEffect(() => {
      const fetchStudents = async (e) => {
          try {
              const response = await fetch('http://localhost:5058/get'); 
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setStudents(data);
          } catch (err) {
              setError(err.message);
          }
      };

      fetchStudents();
  }, []);
  const srarch_result = async (e)=>{
    try {
      const response = await fetch('http://localhost:5058/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({search:search}),
    });
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setStudents(data);
  } catch (err) {
      setError(err.message);
  }
}
  return (
    <div>
      <Link href="/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[25px] absolute right-10 top-10">ADD Student</Link>
      <Link href='/update' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-[25px] absolute right-10 top-28">Update Student</Link>
      <Link href='/delete' className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[25px] absolute right-10 top-48">Delete Student</Link>
      <div className="ml-[30%] mr-[30%]">
        <div className="flex justify-center">
        <input value={search} onChange={(e) => setsearch(e.target.value)} type="search"  placeholder="Search By ID" className="p-2 rounded-[25px] border mt-10 mb-10 min-w-96"/>
        <button onClick={srarch_result} className="p-2 rounded-[25px] border mt-10 mb-10">Search</button>
        </div>
        {students.map((student) => (
                <div key={student.id} className="bg-gray-500 rounded-[25px] flex justify-around  text-white m-5">
                    <h3 className="ml-5 mr-5 font-bold text-left">ID {student.id}</h3>
                    <h3 className="ml-5 mr-5 font-bold text-center">{student.name}</h3>
                    <h3 className="ml-5 mr-5 font-bold text-right">Grade {student.grade}</h3>
                </div>
            ))}
      </div>
    </div>
  );
  }
