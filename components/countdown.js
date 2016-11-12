import React from 'react';
import countdown from 'countdown';

const Countdown = () => {

  const dayCount =
    countdown( null, new Date(2016, 11, 25), countdown.DAYS )
    .toString();

  return (
    <div className={'countdown-wrapper'}>
      <img
        src={'../images/cool_bubble.jpg'}
        className={'speech-bubble-image'}
        style={{ width: '100px', height: '100px' }}
      />
      <div className={'countdown-text'}>
        { dayCount }
        {' until Christmas!'}
      </div>
      <img
        src={'../images/reindeer-icon.png'}
        className={'deer-image'}
        style={{ width: '60px', height: '60px' }}
      />
    </div>
  );
}

export default Countdown;
