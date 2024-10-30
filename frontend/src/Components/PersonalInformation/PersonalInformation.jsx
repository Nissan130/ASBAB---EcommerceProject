import React, { useContext, useEffect, useState } from 'react';
import './PersonalInformation.css';
import { GlobalContext } from '../../Context/GlobalContext';

const PersonalInformation = () => {
  const { userInfo, userId } = useContext(GlobalContext); // Get userInfo and userId from context
  const [isLoading, setIsLoading] = useState(true); // Loading state to show a spinner or message

  // Effect to set loading state based on userInfo
  useEffect(() => {
    if (userInfo) {
      setIsLoading(false); // Data is available, stop loading
    } else if (userId) {
      setIsLoading(true); // UserId exists but userInfo not yet loaded
    }
  }, [userInfo, userId]);

  return (
    <div className="personal-information-container">
      <h2>Personal Information</h2>
      {isLoading ? (
        <p>Loading user information...</p>
      ) : userInfo ? (
        <>
          <form>
            <div className='personal-information'>
              <div className="personalInfo-inputBox-row">
                <div className="info">
                  <label htmlFor="username">Username</label><br />
                  <input type="text" value={userInfo.username} readOnly />
                </div>
                <div className="info">
                  <label htmlFor="fullname">Fullname</label><br />
                  <input type="text" value={userInfo.fullname} readOnly />
                </div>
              </div>

              <div className="personalInfo-inputBox-row">
                <div className="info">
                  <label htmlFor="email">Email</label><br />
                  <input type="email" value={userInfo.email} readOnly />
                </div>
                <div className="info">
                  <label htmlFor="mobile">Mobile Number</label><br />
                  <input type="text" value={userInfo.mobile} readOnly />
                </div>
              </div>
            </div>
            <div className="update-personal-info">
              <input type="submit" value='Update Information' />
            </div>
          </form>
        </>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};

export default PersonalInformation;
