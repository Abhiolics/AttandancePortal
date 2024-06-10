"use client"
import { useState } from "react";


const Page = () => {

{/* <script>
  const id1 = document.getElementById('cid');
  const cn = document.getElementById('cn');
  const cd = document.getElementById('cd');
  const cs = document.getElementById('cs');
  const cb = document.getElementById('cb');
  const out1 = document.getElementById('o1');

  function fun1(){
    out1.innerHTML = {id1, cn, cd, cs}
  }

  cb.addEventListener('click', fun1);
</script> */}

//   const [company, setCompany] = useState([]);
//   const [state, setState] = useState({
//       title: "",
//       note: "",
      
//   })
//   const handleChange = (e) => {
//       setState({ ...state, [e.target.name]: e.target.value })
//   }
  
//   const handleDelete = (id) => {
//  const leftCompany = company.filter((company,i)=> company.id !== id);
//  setCompany(leftCompany)
      

//   }

//   const handleSubmit = (e) => {
//       e.preventDefault();
//       // console.log(state);

//       setCompany([...company, state]);
//       setState({
//           title:"",
//           note:""
//       })
//   }

  return (
    <div>
      <form action="" >
    <div className='flex gap-5 justify-center items-center'>
          <input  id="cid" type="number" placeholder='Company ID' className='px-2 py-2 text-center rounded-md mt-4' required  />
          <input id="cn"  type="text" placeholder='Company Name' className='px-2 py-2 text-center rounded-md mt-4' required  />
          <input id="cd" type="text" placeholder='Company Description' className='px-2 py-2 text-center rounded-md mt-4' required  />
          <input  id="cs" type="text" placeholder='Status of Company' className='px-2 py-2 text-center rounded-md mt-4' required  />
          <button id="cb" className='btn w-32 btn-success items-center mt-4'>Add</button>
      </div>
      </form>
  <div className="overflow-x-auto">
<table className="table" id="o1">
  {/* head */}
  <thead>
    <tr>
      <th></th>
      <th>Company ID</th>
      <th>CompanyName</th>
      <th>Company Description</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {/* row 1 */}
    <tr>
      <th>1</th>
      <td>03432</td>
      <td>Quality Control Specialist</td>
      <td>RO Enterprises</td>
      <td>Active</td>
    </tr>
    {/* row 2 */}
    <tr className="hover">
      <th>2</th>
      <td>50018</td>
      <td>Desktop Support Technician</td>
      <td>Papaya Coders Pvt. Ltd.</td>
      <td>Active</td>
    </tr>
    {/* row 3 */}
    <tr>
      <th>3</th>
      <td>72008</td>
      <td>Tax Accountant</td>
      <td>Alok Consultancies</td>
      <td>Unactive</td>
    </tr>
    {/* row 4 */}
    <tr>
      <th>4</th>
      <td>67779</td>
      <td>Tax Analysis</td>
      <td>Alok Consultancies</td>
      <td>Unactive</td>
    </tr>
    {/* row 5 */}
    <tr>
      <th>5</th>
      <td>71222</td>
      <td>Software Development</td>
      <td>Alok Consultancies</td>
      <td>Unactive</td>
    </tr>
    {/* row6 */}
    <tr>
      <th>6</th>
      <td>90087</td>
      <td>Mongoose Design</td>
      <td>Alok Consultancies</td>
      <td>Unactive</td>
    </tr>
    {/* row */}
    <tr>
      <th>7</th>
      <td>72000</td>
      <td>Hosting Department</td>
      <td>Vaibhav Hosting Services</td>
      <td>Active</td>
    </tr>
    {/*  */}
    <tr>
      <th>7</th>
      <td>72000</td>
      <td>Hosting Department</td>
      <td>Vaibhav Hosting Services</td>
      <td>Active</td>
    </tr>
    <tr>
      <th>7</th>
      <td>72000</td>
      <td>Hosting Department</td>
      <td>Vaibhav Hosting Services</td>
      <td>Active</td>
    </tr>
    <tr>
      <th>7</th>
      <td>72000</td>
      <td>Hosting Department</td>
      <td>Vaibhav Hosting Services</td>
      <td>Active</td>
    </tr>
    <tr>
      <th>7</th>
      <td>72000</td>
      <td>Hosting Department</td>
      <td>Vaibhav Hosting Services</td>
      <td>Active</td>
    </tr>
    <tr>
      <th>7</th>
      <td>72000</td>
      <td>Hosting Department</td>
      <td>Vaibhav Hosting Services</td>
      <td>Active</td>
    </tr>
    <tr>
      <th>7</th>
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

export default Page
