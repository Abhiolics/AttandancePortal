import React from 'react'

const Page = () => {
  return (
    <div>
      <div className="stat">
    <div className="stat-figure text-secondary">
      <div className="avatar online">
        <div className="w-16 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
    </div>
    <div className="stat-value">800015</div>
    <div className="stat-title">Abhay Sharma</div>
    <div className="stat-desc text-secondary">Hosting Services Pvt. Ltd.</div>
  </div>


<div className='flex  flex-col gap-5 items-center justify-between'>
  <div className="stats bg-primary text-primary-content">
  
  <div className="stat">
    <div className="stat-title">Account balance</div>
    <div className="stat-value">$89,400</div>
    <div className="stat-actions">
      <button className="btn btn-sm btn-success">Add funds</button>
    </div>
  </div>
  
  <div className="stat">
    <div className="stat-title">Current balance</div>
    <div className="stat-value">$89,400</div>
    <div className="stat-actions gap-2 flex ">
      <button className="btn btn-sm">Withdrawal</button> 
      <button className="btn btn-sm">Deposit</button>
    </div>
  </div>
  
</div>
{/* The button to open modal */}
<label htmlFor="my_modal_6" className="btn btn-outline text-white">View Status</label>

{/* Put this part before </body> tag */}
<input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box ">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">This modal works with a hidden checkbox!</p>
    <div className="modal-action">
      <label htmlFor="my_modal_6" className="btn btn-outline">Close!</label>
    </div>
  </div>
</div>



</div>
    </div>
  )
}

export default Page
