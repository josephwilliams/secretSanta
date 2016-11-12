import React from 'react';
import countdown from 'countdown';

const Countdown = () => {

  const dayCount =
    countdown( null, new Date(2016, 11, 25), countdown.DAYS )
    .toString();

  return (
    <div className={'countdown-wrapper'}>
      <img src={'../images/santa_transparent.png'} className={'deer-image'} />
      <div className={'countdown-text'}>
        { dayCount }
        {' until Christmas!'}
      </div>
    </div>
  );
}

export default Countdown;
