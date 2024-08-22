import React from 'react';
import spinner from './spinner.svg';

const Spinner = () => (
  <img
    src={spinner}
    style={{ width: '55px', margin: 'auto', display: 'block' }}
    alt="Loading..."
  />
);

export default Spinner;

// spinner reference: https://loading.io/
// color reference: https://coolors.co/134074-13315c-0b2545-8da9c4-eef4ed
