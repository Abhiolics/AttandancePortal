"use client"
import Link from 'next/link';
import React, { useEffect } from 'react'

// async function getUsers(){
//     let data = await fetch("https://attend.anujdwivedi.in/schedule/get-schedules");
//     data = await data.json();
//     return data;
// }

export default async function Page({ params }) {
  // const users = await getUsers();
  // console.log(users);

  useEffect(() => {
    checkAdmin();

    checkToken();
  }, []);

  
  function getData(e) {
    e.preventDefault();

    let data = {
      email: email,
      password: password
    }

    let config = {
      method: 'post',
      url: 'https://attend.anujdwivedi.in/schedule/get-schedules',
      data: data,
    }

    axios.request(config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error))
    }

  return (
    <div>
      <h1>Schedule</h1>
      {/* {
        users.map((item) => (
            <div className='user-item'>
                <span><Link href={`users/${item.id}`}>{item.name}</Link></span>
            </div>
        ))
      } */}

      <div className='flex gap-5 justify-center items-center'>
        <form action="" onSubmit={getdata}>
        <input type="text" placeholder='Device Serial' className='px-2 py-2 text-center rounded-md mt-4' required />
        <input type="text" placeholder='Device Name' className='px-2 py-2 text-center rounded-md mt-4' required />
        <input type="text" placeholder='Location' className='px-2 py-2 text-center rounded-md mt-4' required />
        <button className='btn w-32 btn-success items-center mt-4'>Add</button>
        </form>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Device Serial</th>
              <th>Device Name</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th></th>
              <td>03432</td>
              <td>Quality Control Specialist</td>
              <td>RO Enterprises</td>
              <td>Active</td>
            </tr>
            {/* row 2 */}
            <tr className="hover:bg-green-600">
              <th></th>
              <td>50018</td>
              <td>Desktop Support Technician</td>
              <td>Papaya Coders Pvt. Ltd.</td>
              <td>Active</td>
            </tr>
            {/* row 3 */}
            <tr className="hover:bg-green-600">
              <th></th>
              <td>72008</td>
              <td>Tax Accountant</td>
              <td>Alok Consultancies</td>
              <td>Unactive</td>
            </tr>
            {/* row 4 */}
            <tr className="hover:bg-green-600">
              <th></th>
              <td>67779</td>
              <td>Tax Analysis</td>
              <td>Alok Consultancies</td>
              <td>Unactive</td>
            </tr>
            {/* row 5 */}
            <tr className="hover:bg-green-600">
              <th></th>
              <td>71222</td>
              <td>Software Development</td>
              <td>Alok Consultancies</td>
              <td>Unactive</td>
            </tr>
            {/* row6 */}
            <tr className="hover:bg-green-600">
              <th></th>
              <td>90087</td>
              <td>Mongoose Design</td>
              <td>Alok Consultancies</td>
              <td>Unactive</td>
            </tr>
            {/* row */}
            <tr>
              <th></th>
              <td>72000</td>
              <td>Hosting Department</td>
              <td>Vaibhav Hosting Services</td>
              <td>Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

