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
    </div>
  )
}

export default Page
