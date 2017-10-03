import React, {Component} from "react";
import {Card} from "react-native-material-design";
import CampoTexto from "../Campos/CampoTexto";
import CampoSenha from "../Campos/CampoSenha";
import BotaoBase from "../Campos/BotaoBase";
import {Container, Content, Form, Item} from "native-base";


export default class CadastroUsuarioComponent extends Component {
  constructor(props) {
    super(props);
    this.state = props.states;
    this.salvar = props.salvar;
    this.disabled = props.disabled;
  }

  render() {
    return (
      <Container>
        <Content>
          <Card style={{paddingBottom: 15}}>
            <CampoTexto
              label="Email"
              onChange={(email) => {
                this.setState({email});
              }}
            />

            <CampoTexto
              label="Nome"
              onChange={(nome) => {
                this.setState({nome});
              }}
            />
            <CampoSenha
              label="Senha"
              onChange={(senha) => {
                this.setState({senha});
              }}
            />
            <CampoSenha
              label="Verificar senha"
              onChange={(verificarSenha) => {
                this.setState({verificarSenha});
              }}
            />
          </Card>
          <BotaoBase
            title="Cadastrar"
            disabled={this.disabled(this.state)}
            onPress={() => this.salvar(this.state)}
          />
        </Content>
      </Container>
    );
  }
}