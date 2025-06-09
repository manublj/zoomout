import React from 'react';

const LegendBoxASCII = () => {
  const renderASCII = () => {
    return `[ Timeline Legend / Color Key ]
+----------------------------------------------------------------------------------+
| ■ Historical Arc   ■ Thematic Sequence   ■ Active   ■ Closed   ■ High Rupture    |
+----------------------------------------------------------------------------------+`;
  };

  return <pre className="ascii-component">{renderASCII()}</pre>;
};

export default LegendBoxASCII; 