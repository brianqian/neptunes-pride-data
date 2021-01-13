import React, { useState } from 'react';
import styled from 'styled-components';
import timeToOutOfRange from '../src/helpers/math';

const Container = styled.div``;

const Calculator = () => {
  const [formState, setFormState] = useState({
    data: '',
    home: '',
    enemy: '',
    target: '',
    scan: '',
  });
  const [result, setResult] = useState('');

  const clickHandler = () => {
    const { home, enemy, target, scan, data } = formState;
    setResult(timeToOutOfRange({ home, enemy, target, scanningRange: scan, data }));
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Container>
      data: <input value={formState.data} onChange={changeHandler} name="data" type="text" />
      scan: <input value={formState.scan} onChange={changeHandler} name="scan" type="text" />
      home: <input value={formState.home} onChange={changeHandler} name="home" type="text" />
      enemy: <input value={formState.enemy} onChange={changeHandler} name="enemy" type="text" />
      target: <input value={formState.target} onChange={changeHandler} name="target" type="text" />
      <button onClick={clickHandler}>submit</button>
      result: {result}
    </Container>
  );
};

export default Calculator;
