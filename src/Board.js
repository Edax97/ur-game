import React from 'react';
import Tablero from "./Images/ur_board.png"
import Cero from "./Images/cero.png"
import Uno from "./Images/uno.png"
import Pieza0 from "./Images/black.png"
import Pieza1 from "./Images/white.png"
import Trans from "./Images/trans.png"
import Vacio from './Images/vacio.png'
import { ImageBackground } from 'react'
import Contact from './pages/contact'
import BarNavi from './components/NavBar'
import './css/fonts.css';
/*Instalar react-Bootstrap*/
import { FaDice } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Select_fichas = (props) =>(<form class='set-fichas'>
                                <lable id= 'label' for='n_pieces'>{props.fichas} tokens</lable> <br/>
                                <input id='bar' type='range' name='n_pieces' min='1' max='9' onChange={(e)=>props.change(e)}/>
                            </form>)


export class boardUr extends React.Component {


  constructor(props){
      super(props)
      this.state = {value: "7", flag: 0, estilo: 'Dark',
                    mode: 'light', estilo_f: '/light_mode.css'};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.change_style = this.change_style.bind(this);

  }


  handleSubmit(event) {

    this.props.moves.configurar_fichas(parseInt(this.state.value));

    //window.location.reload();
    event.preventDefault();
  }


  handleChange(event) {

    this.setState({value: event.target.value,});
  }


  onClick(pos, column) {

    this.props.moves.clickCell(pos, column);
  }

  change_style(event){
    let nuevo_estilo = this.state.estilo== 'Dark' ? 'Light' : 'Dark';
    let nuevo_mode = this.state.mode== 'dark' ? 'light' : 'dark';
    this.setState({estilo: nuevo_estilo, mode: nuevo_mode, estilo_f: `/${ nuevo_mode }_mode.css`});
    event.preventDefault();

  }

  render() {

    //Declare winner
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



    //STYLING

    const color_jugadores = ["#808080","#e6e6e6"];
    const style_player= {'color':color_jugadores[this.props.ctx.currentPlayer]};
    const style_goal= (file) =>({'backgroundColor':color_jugadores[file/2]});

    const finalStyle = {border: '4px dashed',textAlign: 'center'};
    const a = 40;

    const style_dice = {position: "relative", top: "4px", left: "4px",};



    //Cuantas piezas estan en el inicio
    const Pieces_S0 = this.props.G.pos_fichas[0].filter(c => c == -1).length;
    const Pieces_S1 = this.props.G.pos_fichas[1].filter(c => c == -1).length;

    //Cuantas fichas llegaron a la meta
    //const Pieces_G0 = this.props.G.pos_fichas[0].filter(c => c == 14).length;
    //const Pieces_G1 = this.props.G.pos_fichas[1].filter(c => c == 14).length;

    //Crear tablero con fichas dentro

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
            cells.push(<td class='cell_style' border={"none"} key={500+j}></td>);
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
            <td class='cell_style' key={i*100+id} onClick={() => this.onClick(ID, CL)}>
              <img class='img_ficha' src={[Lista_Fichas[index_p]]}/>

            </td>
          );
          continue;
        }

        cells.push(
          <td class='cell_style' key={i*100+id} onClick={() => this.onClick(ID, CL)}>
            <img class='img_ficha' src={[Lista_Fichas[index_p]]}/>

          </td>
        );

      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    //Decidir posicion de cada Dado
    var Lista_Dados = [Cero, Uno];

    //Llenar los cajones con las fichas restantes
    let Fichas_Restantes_0= [];
    let Fichas_Restantes_1= [];
    const _n = this.props.G.num_fichas;
    for (let k=0; k<Pieces_S0; k++){
      Fichas_Restantes_0.push(<img src={Pieza0} class='piece'/>);}
    for (let k=Pieces_S0;k<_n;k++){
      Fichas_Restantes_0.push(<img src={Vacio} class='black_piece'/>);}

    for (let k=0; k<Pieces_S1; k++){
      Fichas_Restantes_1.push(<img src={Pieza1} class='piece'/>);}
    for (let k=Pieces_S1;k<_n;k++){
      Fichas_Restantes_1.push(<img src={Vacio} class='black_piece'/>);}


    return (




      <div class='Page'>






        <link id='stilo_sw' rel='stylesheet' type='text/css' href={process.env.PUBLIC_URL +this.state.estilo_f}/>
        <div class="Document" style={style_player}>

        <div class= 'navegacion'>
          <BarNavi mode={ this.state.mode } style_mss={`${ this.state.estilo } mode`} change_style= {(e)=>(this.change_style(e))}/>
        </div>


        <div class='Header' id='royal_home'>
          <h1 class='head'>The Royal game of Ur</h1>

        </div>


        <Container fluid >
          <Row className="justify-content-md-center big-container" >
            <Col lg="8">

              <div class='Body1'>
              <div class='spacer'>
                <td class="Drawer">
                  {Fichas_Restantes_0}
                </td>
              </div>

              <div class='Tablero'>

                <table id="board" class='tablero'>
                  <tbody>{tbody}</tbody>
                </table>
              </div>
              <div class='spacer'>
                <td class="Drawer">
                  {Fichas_Restantes_1}
                </td>
              </div>
              </div>
            </Col>

            <Col lg="4">

              <div class='Footer'>
                <div class='dice_drawer foot'>
                  <button type="button" class='bttn' onClick={()=>this.props.moves.throw_dice()} >
                    <p>{this.props.G.dice_mssg}{ this.props.G.dice_mssg=='Roll the ' ? < FaDice class='dice'/> : ''}</p>
                  </button> <br></br>

                  <img src={Lista_Dados[this.props.G.d1]} alt="Dado1" class='dice-3' style={style_dice}/>
                  <img src={Lista_Dados[this.props.G.d2]} alt="Dado2" class='dice-3' style={style_dice}/>
                  <img src={Lista_Dados[this.props.G.d3]} alt="Dado3" class='dice-3' style={style_dice}/>
                  <img src={Lista_Dados[this.props.G.d4]} alt="Dado4" class='dice-3' style={style_dice}/>
                </div>

                <div class="Info foot">
                  {"It's "} <span style={{backgroundColor: color_jugadores[this.props.ctx.currentPlayer],}}>{player_color[this.props.ctx.currentPlayer]}</span>{"'s turn"} <br></br>
                  {this.props.G.mssg}<br></br>
                {winner}
                </div>

                <div class="Reset foot">
                  <Select_fichas fichas={this.state.value} change={(e)=>(this.handleChange(e))}></Select_fichas>

                  <button type="button"  class='bttn' onClick={(e) => this.handleSubmit(e)}><p>Restart</p> </button> <br></br>
                </div>




            </div>

          </Col>
          </Row>

      </Container>



      <Contact></Contact>

      </div>

      </div>
    );
  }
}
