import React from 'react';
import Tablero from "./Images/ur_board.png"
import Cero from "./Images/cero.png"
import Uno from "./Images/uno.png"
import Pieza0 from "./Images/black.png"
import Pieza1 from "./Images/white.png"
import Trans from "./Images/trans.png"
import Vacio from './Images/vacio.png'
import Fondo from "./Images/madera.jpeg"
import { ImageBackground } from 'react'


const Present = () => (<td class='pres'><p>Developed by {"E."} Campos<br></br> <a href="github.com/Edax97">Github page</a></p></td>)
const Title = () => (<td class='head pres'>
                      <h3>The royal game of Ur</h3>
                      <a href="https://www.mastersofgames.com/rules/royal-ur-rules.htm">Rules of the game</a></td>)

export class boardUr extends React.Component {

  /*
  constructor(props){
      super(props)
      this.state = {value: "5"};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {
    this.props.moves.configurar_fichas(parseInt(this.state.value));
    event.preventDefault();
  }


  handleChange(event) {
    this.setState({value: event.target.value});

    }
  */

  onClick(pos, column) {

    this.props.moves.clickCell(pos, column);
  }

  render() {
    let winner = '';
    const player_color = ["black", "white"];

    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">The winner is {player_color[this.props.ctx.gameover.winner]}</div>
        ) : (
          <div id="winner">{"Draw!"}</div>
        );
    }

    const cellStyle = {
      border: 'none',
      width: '50px',
      height: '50px',
      lineHeight: '50px',
      textAlign: 'center',
      alignItem: '',

    };

    const color_jugadores = ["#808080","#e6e6e6"];

    const finalStyle = {border: '4px solid red',textAlign: 'center',  width: '50px',height: '50px'};
    const Gstyle = {position: "relative", top: "10px", left: "50px",border: '2px solid red',textAlign: 'center',  width: '15px',height: '15px'};
    //const G1style = {position: "absolute", top: "400px", left: "20px",border: '1px solid black',textAlign: 'center',  width: '15px',height: '15px'};
    const a = 40;


    const style_info = {border:"2px solid black", backgroundColor:color_jugadores[this.props.ctx.currentPlayer], position: "relative", top: "490px", left: "200px", width: "200px", height:"90px"};

    const style_reset = {border:"2px solid black", backgroundColor: 'rgba(52, 52, 52, 0.3)', position: "relative", top: "380px", left: "200px", width: "160px", height:"90px"};

    //const style_Dados = {border:"2px solid black", position: "absolute", top: "400px", left: "500px", width: "200px", height:"120px"};
    const style_Dados = {border:"2px solid black", backgroundColor:color_jugadores[this.props.ctx.currentPlayer], position: "relative",
                         textAlign: "center", top: "450px", left: "600px", width: "250px", height:"150px"};
    const style_dice = {position: "relative", top: "4px", left: "4px", width: "60px", height:"60px"};
    const style_inside = {position: "relative", top: "4px", left: "4px", width: "40px", height:"40px"};

    const style_drawer0 = {border:"2px solid black", backgroundColor:'rgba(52, 52, 52, 0.3)', position: "absolute", top:'39px', left: "550px", width: "290px", height:"50px"};
    var style_drawer1 = Object.assign({}, style_drawer0);
    style_drawer1.top="370px";



    //Cuantas piezas estan en el inicio
    const Pieces_S0 = this.props.G.pos_fichas[0].filter(c => c == -1).length;
    const Pieces_S1 = this.props.G.pos_fichas[1].filter(c => c == -1).length;

    //Cuantas fichas llegaron a la meta
    //const Pieces_G0 = this.props.G.pos_fichas[0].filter(c => c == 14).length;
    //const Pieces_G1 = this.props.G.pos_fichas[1].filter(c => c == 14).length;

    var id = 0;
    const Lista_Fichas = [Pieza0, Pieza1, Trans];
    let tbody = [];
    for (let i = 0; i < 3; i++) {
      let cells = [];
      for (let j = 0; j < 8; j++) {
        if (i==1){
          id = 9-j;
        }
        else{
          if (j>5){ id = j-6;}
          else if (j<5){ id = 10+j;}
          else {
            cells.push(<td class='test_cell' border={"none"} key={500+j}></td>);
            continue;}
        }
        var contenido_cell;
        var index_p;
        if (this.props.G.cells[1][id] == 1 && i!=0 ){contenido_cell = 1; index_p = 1;}
        else if (this.props.G.cells[0][id] == 1 && i!=2) {contenido_cell = 0; index_p = 0;}
        else {contenido_cell = null; index_p = 2;}
        var cl =10;
        if (i==0){cl = 0;}
        if (i==1){cl = -1;}
        if (i==2){cl =1;}
        const ID = id;
        const CL = cl;
        if (j==4 && i !=1){
          cells.push(
            <td style={finalStyle} key={i*100+id} onClick={() => this.onClick(ID, CL)}>
              <img src={[Lista_Fichas[index_p]]} position={"relative"} width={"40px"} height={"40px"} top = {"10 px"}/>
            <td style={Gstyle}>{this.props.G.pos_fichas[CL].filter(c => c == 14).length}</td>
            </td>
          );
          continue;
        }

        cells.push(
          <td style={cellStyle} key={i*100+id} onClick={() => this.onClick(ID, CL)}>
            <img class='img_ficha' src={[Lista_Fichas[index_p]]}/>

          </td>
        );

      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    //Decidir posicion de cada Dado
    var Lista_Dados = [Cero, Uno];
    //const player_color = ["negro", "blanco"];
    let Fichas_Restantes_0= [];
    let Fichas_Restantes_1= [];
    const n = this.props.num_fichas;
    for (let k=0; k<Pieces_S0; k++){
      Fichas_Restantes_0.push(<img src={Pieza0} style={style_inside} top={'4px'} left={'30px'}/>);}
    for (let k=Pieces_S0;k<n;k++){
      Fichas_Restantes_0.push(<img src={Vacio} top={'4px'} left={'30px'}/>);}

    for (let k=0; k<Pieces_S1; k++){
      Fichas_Restantes_1.push(<img src={Pieza1} style={style_inside} top={'4px'} left={'30px'}/>);}
    for (let k=Pieces_S1;k<n;k++){
      Fichas_Restantes_1.push(<img src={Vacio} top={'4px'} left={'30px'}/>);}


    return (
      <div class='Page'>

        <div class="Document">

        <div class='Header'>
          <Title></Title>
          <Present></Present>
        </div>


        <div class='Body'>
          <img src={Tablero} alt="Tablero" class='tablero' border = {"2px solid black"}/>
          <table id="board" class='tablero board'>
            <tbody>{tbody}</tbody>
          </table>
          <td id="Drawer0">
            {Fichas_Restantes_0}
          </td>
          <td id="Drawer1">
            {Fichas_Restantes_1}
          </td>
        </div>


        <div class='Footer'>
          <td class='dice_drawer'>
          <button type="button" class='bttn_dice' onClick={()=>this.props.moves.throw_dice()} >
          {this.props.G.dice_mssg}</button> <br></br>
          <br></br>
          <img src={Lista_Dados[this.props.G.d1]} alt="Dado1" style={style_dice}/>
          <img src={Lista_Dados[this.props.G.d2]} alt="Dado2" style={style_dice}/>
          <img src={Lista_Dados[this.props.G.d3]} alt="Dado3" style={style_dice}/>
          <img src={Lista_Dados[this.props.G.d4]} alt="Dado4" style={style_dice}/>
          </td>

          <td class="Reset">
            <br></br>
            <button type="button"  class='bttn_rs' onClick={()=>window.location.reload()}> Restart </button> <br></br>
          </td>

          <td class="Info">
            {"It's "} {player_color[this.props.ctx.currentPlayer]}{"'s turn"} <br></br>
            {this.props.G.mssg}<br></br>
          {winner}
          </td>
        </div>



      </div>

      </div>
    );
  }
}
