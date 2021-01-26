import React, { Component } from 'react';
import './App.css';
import {Container, Col, Row, Form, Button, Badge, Dropdown} from 'react-bootstrap';

let text;
let data = [];
let id = 0;
let up = false;
let down = false;
let rate = 10;
let pitch = 10;
let language = 'en';
let proceed = true;

class Input extends Component {
  componentDidMount = () => {
    id ++;
  }

	render() {
  	return(
      <div id={"div-" + id}>
        <Row style={{marginTop: 10}}>
          <Col style={{paddingRight: 1}}>
            <Button id={id} onClick={(e) => this.speak(e)} block className="btn-lg" variant="secondary">{text}</Button>
          </Col>
          <Col style={{paddingLeft: 1}} className="col-4 col-sm-3 col-md-2 col-lg-1">
            <Button id={id} onClick={(e) => this.handleDelete(e)} className="btn-lg" block variant="danger">🗑</Button>
          </Col>
        </Row>
      </div>
    );
  }

  speak = (e) => {
    let num = e.target.id;
    window.speechSynthesis.cancel();
    let msg = new SpeechSynthesisUtterance(data[num][0]);
    msg.rate = data[num][1];
    msg.pitch = data[num][2];
    msg.lang = data[num][3];
    window.speechSynthesis.speak(msg);
    if(!window.speechSynthesis.speaking){
      setTimeout(() => {
        this.speak(e);
      }, 500);
    }
  }

  handleDelete = (e) => {
    let id = parseInt(e.target.id);
    let div = document.getElementById('div-' + id);
    div.parentNode.removeChild(div);
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {inputList: []};
    this.addVoice = this.addVoice.bind(this);
  }

  addVoice(){
    const inputList = this.state.inputList;
    this.setState({
        inputList: inputList.concat(<Input key={inputList.length} />)
    });
  }

  upRate = (e) => {
    e.type === 'mousedown' ? up = true : up = false;
    if(rate < 20 && proceed === true) this.loopUpRate();
  }

  loopUpRate = () => {
    if(up === true){
      proceed = false;
      setTimeout(() => {
        rate ++;
        this.setState({rate});
        proceed = true;
        if(rate < 20) this.loopUpRate();
      }, 200);
    }
  }

  downRate = (e) => {
    e.type === 'mousedown' ? down = true : down = false;
    if(rate > 0 && proceed === true) this.loopDownRate();
  }

  loopDownRate = () => {
    if(down === true){
      proceed = false;
      setTimeout(() => {
        rate --;
        this.setState({rate});
        proceed = true;
        if(rate > 0) this.loopDownRate();
      }, 200);
    }
  }

  upPitch = (e) => {
    e.type === 'mousedown' ? up = true : up = false;
    if(pitch < 20 && proceed === true) this.loopUpPitch();
  }

  loopUpPitch = () => {
    if(up === true){
      proceed = false;
      setTimeout(() => {
        pitch ++;
        this.setState({pitch});
        proceed = true;
        if(pitch < 20) this.loopUpPitch();
      }, 200);
    }
  }

  downPitch = (e) => {
    e.type === 'mousedown' ? down = true : down = false;
    if(pitch > 0 && proceed === true) this.loopDownPitch();
  }

  loopDownPitch = () => {
    if(down === true){
      proceed = false;
      setTimeout(() => {
        pitch --;
        this.setState({pitch});
        proceed = true;
        if(pitch > 0) this.loopDownPitch();
      }, 200);
    }
  }

  handleChange = (e) => {
    text = e.target.value;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(text !== undefined && text !== ''){
      window.speechSynthesis.cancel();
      let msg = new SpeechSynthesisUtterance(text);
      msg.rate = rate/10;
      msg.pitch = pitch/10;
      msg.lang = language;
      window.speechSynthesis.speak(msg);
      data.push([text,rate/10,pitch/10,language]);
      if(!window.speechSynthesis.speaking){
        setTimeout(() => {
          this.speak(e);
        }, 500);
      } else {
        this.addVoice();
      }
    }
  }

  render() { 
    return ( 
      <div className="App">
        <header className="App-header">
          <Container>
            <Col>
              <Row style={{marginBottom: 40}}>
                <Col className="col-1"></Col>
                <Col className="col-1" style={{marginRight: 20}}>
                  <Row className="justify-content-center">
                    <Badge>RATE</Badge>
                  </Row>
                  <Row className="justify-content-center">
                    <Button onClick={(e) => this.upRate(e)} onMouseDown={(e) => this.upRate(e)} variant="danger">⟰</Button>
                  </Row>
                  <Row className="justify-content-center">
                    <Badge>{rate/10}</Badge>
                  </Row>
                  <Row className="justify-content-center">
                    <Button onClick={(e) => this.downRate(e)} onMouseDown={(e) => this.downRate(e)} variant="danger">⟱</Button>
                  </Row>
                </Col>
                <Col className="col-1" style={{marginRight: 30}}>
                  <Row className="justify-content-center">
                    <Badge>PITCH</Badge>
                  </Row>
                  <Row className="justify-content-center">
                    <Button onClick={(e) => this.upPitch(e)} onMouseDown={(e) => this.upPitch(e)} variant="danger">⟰</Button>
                  </Row>
                  <Row className="justify-content-center">
                    <Badge>{pitch/10}</Badge>
                  </Row>
                  <Row className="justify-content-center">
                    <Button onClick={(e) => this.downPitch(e)} onMouseDown={(e) => this.downPitch(e)} variant="danger">⟱</Button>
                  </Row>
                </Col>
                <Col className="col-1 align-self-end">
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary">Language</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={(e) => this.changeLanguage(e)}>Deutsch</Dropdown.Item>
                      <Dropdown.Item onClick={(e) => this.changeLanguage(e)}>English</Dropdown.Item>
                      <Dropdown.Item onClick={(e) => this.changeLanguage(e)}>Español</Dropdown.Item>
                      <Dropdown.Item onClick={(e) => this.changeLanguage(e)}>Français</Dropdown.Item>
                      <Dropdown.Item onClick={(e) => this.changeLanguage(e)}>Italiano</Dropdown.Item>
                      <Dropdown.Item onClick={(e) => this.changeLanguage(e)}>Polski</Dropdown.Item>
                      <Dropdown.Item onClick={(e) => this.changeLanguage(e)}>Pусский</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <Form onSubmit={this.handleSubmit}>
                <Form.Control className="form-control-lg" placeholder="TYPE TEXT" onChange={this.handleChange}/> 
                <Form.Text className="text-muted">If you can't hear anything after pressing "enter", try switching your browser</Form.Text>
              </Form>
              {this.state.inputList}
            </Col>
          </Container>
        </header>
      </div>
    );
  }

  changeLanguage = (e) => {
    let lan = e.target.innerHTML;
    switch(lan){
      case 'Deutsch':
        language = 'de';
        break;
      case 'Español':
        language = 'es';
        break;
      case 'Français':
        language = 'fr';
        break;
      case 'Italiano':
        language = 'it';
        break;
      case 'Polski':
        language = 'pl';
        break;
      case 'Pусский':
        language = 'ru';
        break;
      default:
        language = 'en';
        break;
    }
  }
}

export default App;
