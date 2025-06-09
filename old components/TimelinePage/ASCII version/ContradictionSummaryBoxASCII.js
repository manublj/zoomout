import React from 'react';

const ContradictionSummaryBoxASCII = ({ summary }) => {
  if (!summary) return null;

  const renderASCII = () => {
    return `[ Core Contradiction Summary Box ]
+----------------------------------------------------------------------------------+
| ┌──────────────────────────── Summary Box ─────────────────────────────┐         |
| │ "${summary.substring(0, 60)}..."  │         |
| └──────────────────────────────────────────────────────────────────────┘         |
+----------------------------------------------------------------------------------+`;
  };

  return <pre className="ascii-component">{renderASCII()}</pre>;
};

export default ContradictionSummaryBoxASCII; 