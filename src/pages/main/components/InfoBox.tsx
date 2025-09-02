import React from "react";

const InfoBox: React.FC<{}> = () => {
  return (
    <div className='main__infoBox'>
      <div>
        <h1 className='main__infoBox__mainTitle'>Codon</h1>
        <p className='main__infoBox__underTitle'>Help yourself app</p>
      </div>
      <p className='main__infoBox__text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>

      <p className='main__infoBox__text'>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
    </div>
  )
}

export default InfoBox;