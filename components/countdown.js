import React from 'react';
import countdown from 'countdown';

const Countdown = () => {

  const dayCount =
    countdown( null, new Date(2016, 11, 25), countdown.DAYS )
    .toString();

  return (
    <div className={'countdown-wrapper'}>
      <div className={'countdown-text'}>
        { dayCount }
        {' until Christmas!'}
      </div>
    </div>
  );
}

export default Countdown;
