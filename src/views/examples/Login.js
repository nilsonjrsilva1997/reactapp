import React from 'react';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import api from "services/api";

const Login = (props) => {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const onSubmit = data => Login(data);
  
  const Login = (data) => {    
    api
      .post("/api/login", data)
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        props.history.push('/admin/index');
      })
      .catch((err) => {
        toast.error("Usuário ou senha incorretos!");
    });
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Ou faça login com suas credenciais</small>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>

                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Input placeholder="Email" type="email" autoComplete="new-email" {...field}/>}
                  />
                </InputGroup>
                {/* validation */}
                {errors.email && <span className="invalid-feedback">Email é obrigatório</span>}               
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>              
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Input placeholder="Senha"type="password"autoComplete="new-password" {...field}/>}
                  />
                </InputGroup>
                {/* validation */}
                {errors.password && <span className="invalid-feedback">Senha é obrigatória</span>}    
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
      <ToastContainer />
    </>
  );
};

export default Login;
