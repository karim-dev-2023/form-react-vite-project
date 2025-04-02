import "./App.css";
import { Container, FloatingLabel, Form, Button } from "react-bootstrap";

import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit,reset } = useForm({
    defaultValues: {
      priority: "1",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Nom */}
          <FloatingLabel
            controlId="floatingName"
            label="Nom"
            className="mb-3 mt-5"
          >
            <Form.Control
              {...register("name", { required: true })}
              placeholder="Votre nom"
            />
          </FloatingLabel>

          {/* Date */}
          <FloatingLabel controlId="floatingdate" label="Date" className="mb-3">
            <Form.Control
              type="date"
              placeholder="La date"
              {...register("date", {
                required: "La date est obligatoire",
               
              })}
          
            />
            
          </FloatingLabel>

          {/* Priorité */}
          <FloatingLabel
            controlId="floatingSelect"
            label="Priorité"
            className="mb-3"
          >
            <Form.Select
              aria-label="Floating label select example"
              {...register("priority")}
            >
              <option value="1">Basse</option>
              <option value="2">Moyenne</option>
              <option value="3">Élevée</option>
            </Form.Select>
          </FloatingLabel>

          {/* Tache terminé */}
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Tache terminer"
            {...register("taskComplete")}
          />

          <Button type="submit" variant="primary">
            Envoyer
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default App;
