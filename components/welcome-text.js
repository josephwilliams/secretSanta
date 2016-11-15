import React from 'react';

const WelcomeText = () => {

  return (
    <div className={'splash-row-text'}>
      <div className={'text-wrapper'}>
        <h2>{'welcome to the Williams family secret santa!'}</h2>
        <p>{'sign up or log in to participate.'}</p>
        <p>{'Rules:'}</p>
        <p>{'1. One account per person'}</p>
        <p>{'2. The random draw will occur once everyone has signed up'}</p>
      </div>
    </div>
  );
}

export default WelcomeText;
