import React from 'react';
// https://stackoverflow.com/questions/40510560/setinterval-with-setstate-in-react
import Screen from './Screen.js';
import CheatScreen from './CheatScreen.js';
import CheatButton from './CheatButton.js';
import Tray from './Tray.js';
import Tile from './Tile.js';

import '../css/Game.css';

// images -> try to clean up put all in '.' & try 2 import
import p12 from '../images/p12.png';
import p7 from '../images/p7.png';
import p14 from '../images/p14.png';
import p17 from '../images/p17.png';
import p23 from '../images/p23.png';
import p22 from '../images/p22.png';
import p8 from '../images/p8.png';
import p18 from '../images/p18.png';
import p2 from '../images/p2.png';
import p13 from '../images/p13.png';
import p24 from '../images/p24.png';
import p21 from '../images/p21.png';
import p9 from '../images/p9.png';
import p3 from '../images/p3.png';
import p25 from '../images/p25.png';
import p16 from '../images/p16.png';
import p19 from '../images/p19.png';
import p4 from '../images/p4.png';
import p10 from '../images/p10.png';
import p5 from '../images/p5.png';
import p6 from '../images/p6.png';
import p11 from '../images/p11.png';
import p15 from '../images/p15.png';
import p20 from '../images/p20.png';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tileTimer: undefined,
      left: 6.5,
      top: 71.5,
      cheat: false,
      screens: [<Screen />, <CheatScreen />],
      styleStore: [], // preload with tile styles in componentWillMount()
      randomIs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      renderedTiles: [], // randomly put 'em (styles) in an array to map out in render()
      tileImages: [
        p12,
        p7,
        p14,
        p17,
        p23,
        p22,
        p8,
        p18,
        p2,
        p13,
        p24,
        p21,
        p9,
        p3,
        p25,
        p16,
        p19,
        p4,
        p10,
        p5,
        p6,
        p11,
        p15,
        p20,
      ]
    };
  }

  toggleHelpButton = () => {
    const toggled = !this.state.cheat;
    console.log(this.state);    
    this.setState({
      cheat: toggled,
    });
  };

  randomTileGenerator = () => {
    const width = 10.5; // tile width  
    const height = 8.5; // tile height
    const xSpace = .4 // horizontal space between tiles
    const ySpace = 1 // vertical space between tiles
    let l = 6.5;
    let t = 71.5;
    const randomIs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    const randomizedTileStyles = [];
    const imgs = this.state.tileImages;
    while (randomIs.length > 1) {
      let rIndex = this.randTileIndex(0, randomIs.length - 1);
      let s = {
        left: l.toString() + 'vw',
        top: t.toString() + 'vh',
        backgroundImage: "url(" + imgs[randomIs[rIndex]] +  ")",
        backgroundSize: '100% 100%'
      }
      randomizedTileStyles.push(s);
      l = randomizedTileStyles.length % 8 === 0 ? 6.5 : l + width + xSpace;
      t = randomizedTileStyles.length % 8 === 0 ? t + height + ySpace : t;
      randomIs.splice(rIndex, 1);
    }
    const finalStyle = {
      left: '82.80000000000001vw',
      top: '90.5vh',
      backgroundImage: "url(" + imgs[randomIs[0]] + ")",
      backgroundSize: '100% 100%'
    };
    randomizedTileStyles.push(finalStyle);
    this.setState({
      styleStore: randomizedTileStyles
    });
  }
  
  randTileIndex = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  componentWillMount() {
    this.randomTileGenerator();
  }

  componentDidMount() {
    this.setState({
      tileTimer: setInterval(() => {
        const rIs = this.state.randomIs;
        let i = this.randTileIndex(0, rIs.length - 1);
        let rendered = this.state.renderedTiles;
        rendered.push(this.state.styleStore[rIs[i]])
        if (rIs.length > 1) {
          rIs.splice(i, 1);
        }
        i = rIs.length > 1 ? this.randTileIndex(0, rIs.length - 1) : rIs[0];
        this.setState({
          renderedTiles: rendered,
          storeIndex: i,
          randomIs: rIs
        })
      }, 50)
    })
  }

  componentDidUpdate() {
    if (this.state.renderedTiles.length === 24 && this.state.timer) {
      clearInterval(this.state.timer);
      console.log("clearingInterval!!!");
    }
  }

  flirtingWithProps = () => {
    const miAmor = this.props;
    console.log('detectedEnvironment: ', miAmor.detectedEnvironment);
    console.log('elementDimensions: ', miAmor.elementDimensions);
    console.log('isActive: ', miAmor.isActive);
    console.log('isPositionOutside: ', miAmor.isPositionOutside);
    console.log('position: ', miAmor.position);
    console.log('In all her beauty: ', miAmor);
  };

  render() {
    const screen = this.state.cheat
      ? this.state.screens[1]
      : this.state.screens[0];
    return (
      <div className="game">
        {
          this.state.renderedTiles.map((s, i) => {
            return <Tile key={i} style={s} />
          })
        }
        {screen}
        <CheatButton toggle={this.toggleHelpButton} />
        <Tray />
      </div>
    );
  }
}

export default Game;

// Game.js needs to programmatically generate the 24 tiles
// so first we need to store the 24 image urls somewhere
// tile dimensions:
// height: 8.5%
// width: 10.5%
// first tile x/y coordinates:
// x(left): 6.5%
// y(top): 71.5%
// space (between tiles): to be determined
// so for top row the next tile would need to:
// increase x by width + space
// and to drop down a row it would need to:
// increase y by height + space
// pretty sure this needs to be on a lifecycle method
// since the tiles do need to show up with the rest of 
// the app lol
// now that I think about it wouldn't it be cool to use a timer
// to make the tiles appear slowly in front of the user?
