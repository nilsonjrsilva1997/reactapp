import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
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

const Register = (props) => {
  const { handleSubmit, control, register, formState: { errors } } = useForm();
  const onSubmit = data => Register(data);

  const Register = (data) => {
    api
      .post("/api/register", data)
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        props.history.push('/admin/index');
      })
      .catch((err) => {
        let errors = err.response.data.errors;

        Object.keys(errors).map((keyI, i) => {
          errors[keyI].map((keyJ, j) => {
            toast.error(errors[keyI][j]);
          });
        });
      });
  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
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
              <small>Or sign up with credentials</small>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Input placeholder="Nome" type="text" {...field}/>}
                  />                  
                </InputGroup>
                {errors.name && <span className="invalid-feedback">Nome é obrigatório</span>}               
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
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
                    render={({ field }) => <Input placeholder="Senha" type="password"autoComplete="new-password" {...field}/>}
                  />                  
                </InputGroup>
                {errors.password && <span className="invalid-feedback">A senha é obrigatória</span>}               

              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Controller
                    name="password_confirmation"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Input placeholder="Confirmar senha" type="password"autoComplete="new-password" {...field}/>}
                  /> 
                </InputGroup>

                {errors.password_confirmation && <span className="invalid-feedback">A confirmação de senha é obrigatória</span>}               

              </FormGroup>
              
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                      {...register("acepted_terms", { required: true })}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        Eu concordo com os termos{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Termos de uso
                        </a>
                      </span>
                    </label>
                  </div>
                  {errors.acepted_terms && <span className="invalid-feedback">É necessário concordar com os termos de uso</span>}
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Criar conta
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </Col>
      <ToastContainer />
    </>
  );
};

export default Register;
