

const Page = () => {
  return (
    <div>
      <div className='flex gap-5 justify-center items-center'>
            <input type="number" placeholder='Department ID' className='px-2 py-2 text-center rounded-md mt-4' required  />
            <input type="text" placeholder='Department Name' className='px-2 py-2 text-center rounded-md mt-4' required  />
            <input type="text" placeholder='Company Name' className='px-2 py-2 text-center rounded-md mt-4' required  />
            <input type="text" placeholder='Status of Company' className='px-2 py-2 text-center rounded-md mt-4' required  />
            <button className='btn w-32 btn-success items-center mt-4'>Add</button>
        </div>
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Department ID</th>
        <th>Department Name</th>
        <th>Company Name</th>
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
      {/* row */}
      <tr>
        <th>7</th>
        <td>72000</td>
        <td>Hosting Department</td>
        <td>Vaibhav Hosting Services</td>
        <td>Active</td>
      </tr>
      {/* row  */}
      <tr>
        <th>7</th>
        <td>72000</td>
        <td>Hosting Department</td>
        <td>Vaibhav Hosting Services</td>
        <td>Active</td>
      </tr>
      {/* row */}
      <tr>
        <th>7</th>
        <td>72000</td>
        <td>Hosting Department</td>
        <td>Vaibhav Hosting Services</td>
        <td>Active</td>
      </tr>
      {/* row */}
      <tr>
        <th>7</th>
        <td>72000</td>
        <td>Hosting Department</td>
        <td>Vaibhav Hosting Services</td>
        <td>Active</td>
      </tr>
      {/* row */}
      <tr>
        <th>7</th>
        <td>72000</td>
        <td>Hosting Department</td>
        <td>Vaibhav Hosting Services</td>
        <td>Active</td>
      </tr>
      {/* row */}
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
