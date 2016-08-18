import React, { Component } from 'react';
import cloud from 'd3-cloud';

export default class WordCloud extends Component {
  constructor(props) {
    super(props);
    this.fontSizes = [23, 21, 19, 17, 15, 13];
    this.state = {
      wordList: []
    }
  }

  componentWillMount() {
    this.layoutWords(this.props.wordList, (words) => {
      this.setState({
        wordList: words
      })
    });
  }

  layoutWords(wordList, fn) {
    let binSize = (wordList.length - 1) / (this.fontSizes.length - 1);

    let words = wordList.map((word, index) => {
      return {
        text: word,
        size: this.fontSizes[Math.floor(index / binSize)]
      }
    });

    let layout = cloud()
      .size([300, 150])
      .words(words)
      .padding(10)
      .rotate(() => 0)
      .random(() => 0.5)
      .fontSize(d => d.size)
      .on('end', fn);

    layout.start();
  }

  render() {
    if (this.state.wordList.length) {
      return (
        <svg width={300} height={200}>
          <circle cx="150" cy="100" r="100" fill="#F6E3CE" />
          <g transform="translate(150, 100)">
            {
              this.state.wordList.map((item, index) => {
                let props = {
                  key: index,
                  textAnchor: 'middle',
                  transform: 'translate(' + item.x + ',' + item.y + ')',
                  style: {
                    fontSize: item.size + 'px',
                    fontWeight: 500,
                    fill: '#DC8322'
                  }
                }
                return (
                  <text {...props}>{item.text}</text>
                )
              })
            }
          </g>
        </svg>
      )
    } else {
      return null
    }
  }
}
