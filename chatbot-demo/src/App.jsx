// import logo from './logo.svg';
import defaultDataset from './dataset';
import './assets/styles/style.css'
import React from 'react';

export default class App extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      anwers: [],
      chats: [],
      currendId: "init",
      dataset: defaultDataset,
      open: false

    }
  }

  render() {
    return (
      <section className='c-section'>
        <div className='c-box'>
          はじめまして
        </div>
      </section>
    );

  }
}

