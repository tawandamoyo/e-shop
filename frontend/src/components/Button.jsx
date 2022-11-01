import React from 'react';

export default function Button({ onClick }) {
  return (
    <button type="button" onClick={onClick}>
      Order
    </button>
  );
}
