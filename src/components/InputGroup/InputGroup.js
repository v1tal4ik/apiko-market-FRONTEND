import React from 'react';
import './style.css';


const InputGroup = ({
  label,
  type,
  name,
  placeholder,
  onChangeFunc,
  onBlurFunc,
  value,
  check,
  status,
  isRequired,
}) => <>
  <label className = 'apiko-form-label'>{ label }</label>
  { isRequired
    ? <input
      className = "apiko-form-input"
      type = { type }
      name = { name }
      placeholder = { placeholder }
      onChange = { onChangeFunc }
      onBlur = { onBlurFunc }
      value = { value }
      required
      />
    : <input
      className = "apiko-form-input"
      type = { type }
      name = { name }
      placeholder = { placeholder }
      onChange = { onChangeFunc }
      onBlur = { onBlurFunc }
      value = { value }
      />
      }
  { check
    ? <div className = 'form-status-icon' >
      {status ? <i className = "fas fa-check green"></i > : < i className = "fas fa-times red" > </i>}
  </div>
    : null
  }
  </>;


export default InputGroup;
