import React, { useEffect, useRef } from 'react';
import MButton from './button';
import MTextArea from './textarea';
import PcMan from './pcman';

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const app = document.getElementById('App');
    let $canvas = document.getElementById('canvas');

    if (!$canvas) {
      $canvas = document.createElement('canvas');
      $canvas.id = 'canvas';
      app?.appendChild($canvas);
      // const pcman = new PcMan();
      // pcman.start();


      // const button = new MButton();
      // button.setPosition(40, 20);
      // button.setText('button')
      // button.setFont('16px sans-serif');
      // button.setMousedown((e: MouseEvent) => {
      //   console.log('button mousedown: ', e);
      // })

      // button.setMouseUp(() => {
      //   console.log('button mouseup');
      //   alert('button mousedown')

      // })
      // button.draw();

      const textarea = new MTextArea()
      textarea.setText(`则开始索引会则开始索引会被自动计算成则开始索引会被自动计算成为则开始索引会被自动计算成为则开始索引会被自动计算成为为则开始索引会被自动计算成为被自动计算成为`);
      textarea.draw();
    }

  },[]);

  return (
    <div id="App" ref={appRef}>
    </div>
  );
}

export default App;
