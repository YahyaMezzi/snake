import React from 'react';

export default (props) => {

  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`
  }
  return (
    <div>
      <div className="food" style={style}></div>
    </div>
  )
}
