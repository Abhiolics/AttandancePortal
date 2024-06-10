import React from 'react'

const Page = () => {
  return (
    <div>
      <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Company Id?</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Company Name?</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Company Description?</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Company Status?</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
</label>
<button className='btn btn-success mt-3 w-32 text-white text-lg'>Update</button>
    </div>
  )
}

export default Page
