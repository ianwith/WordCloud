import React, { Component } from 'react';
import { render } from 'react-dom';

import WordCloud from './WordCloud';

const data = ['学西班牙语', '弹吉他', '权力的游戏', '潜水', '看演出', '海贼王'];

const App = () => <WordCloud wordList={data} />;

render(
  <App />,
  document.getElementById('app')
)
