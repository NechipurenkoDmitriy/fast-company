import React from 'react';

const Qualitie = ({ color, name, _id }) => {
  return (
    <div key={_id} className={`badge bg-${color} m-1`}>
      {name}
    </div>
  );
};

export default Qualitie;
