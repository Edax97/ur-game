import React from 'react';
import tablero from './Ur-game.jpg';
//import cero from './cero,jpg';
//import uno from './uno.jpg';

export class boardUr extends React.Component {
  onClick(id) {
    this.props.moves.clickCell(id);
  }

  render() {
    let winner = '';
    //this.getElementById("demo").innerHTML = "Hello JavaScript!";
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
        ) : (
          <div id="winner">Draw!</div>
        );
    }

    const cellStyle = {
      border: '2px solid white',
      width: '80px',
      height: '80px',
      lineHeight: '50px',
      textAlign: 'center',
    };

    const mssStyle = {
      border: '2px solid black',
      width: '280px',
      height: '80px',
      lineHeight: '20px',
      textAlign: 'left',
      position: "absolute",
      top: 450,
      left: 40,

    };


    const style2 = {
      border: 'none',
    };

    const style_table = {
      margin: 5,
      position: "absolute",
      top: 40,
      left: 40,
      width: 730,
      height: 330,

    };

    const style_image = {
      margin: 5,
      position: "absolute",
      top: 10,
      left: 10,
      width: 800,
      height: 400,

    };
    var id;
    let tbody = [];
    for (let i = 0; i < 3; i++) {
      let cells = [];
      for (let j = 0; j < 8; j++) {
        if (i==1){
          var id = 9-j;
        }
        else{
          if (j>5){ var id = j-6;}
          else if (j<4){ var id = 10+j;}
          else {
            cells.push(
              <td style={style2} key={j}>

              </td>);

          continue;}
        }
        //var pos = j
        cells.push(
          <td style={cellStyle} key={j} onClick={() => this.props.moves.click(id)}>
            {id}
          </td>
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    return (
      <div>
        <img style={style_image} src={tablero} alt="Ur_tablero" />
        <table style={style_table} id="board">
          <tbody>{tbody}</tbody>
        </table>

        <td style={mssStyle}>
        Dados: {this.props.G.dice_sum} <br/>
        Turno de jugador {this.props.ctx.currentPlayer} <br/>
        {this.props.G.mssg}<br/>
        {winner}
        </td>

        <p id="demo">asdasdd</p>

      </div>
    );
  }
}


/*

        <img top={} left={} height={} width={} ref={ ref } src={cero} alt="Dado 1" />
        <img top={} left={} height={} width={} ref={ ref } src={cero} alt="Dado 2" />
        <img style={style_d} src={cero} alt="Dado 3" />
        <img src={cero} alt="Dado 4" />


        <script>
        document.getElementById("demo").innerHTML = "Hello JavaScript!";
        document.getElementById("demo").style.top = "290";
        </script>

*/
