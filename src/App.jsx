import "./App.css";
import { Container, FloatingLabel, Form, Button } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Le nom est requis")
    .min(8, "Minimum 8 caractères")
    .max(15, "Maximum 15 caractères"),
  dateTask: yup
    .string()
    .required("La date est requise")
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "La date n'est pas au format jj/mm/aaaa"
    )

    .test(
      "is-today-or-future",
      "La date doit être aujourd'hui ou dans le futur",
      function (value) {
        if (!value) return false;

        const [day, month, year] = value.split("/").map(Number);
        const inputDate = new Date(year, month - 1, day);
        const today = new Date();

        today.setHours(0, 0, 0, 0);
        inputDate.setHours(0, 0, 0, 0);

        return inputDate >= today;
      }
    ),
  taskComplete: yup.boolean(),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    priority: "1",
  });
  const onSubmit = (data) => {
    console.log(data);
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
              placeholder="Votre nom"
              {...register("name")}
              isInvalid={!!errors.name}
            />
            {errors.name && (
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>

          {/* Date */}
          <FloatingLabel controlId="floatingdate" label="Date" className="mb-3">
            <Form.Control
              placeholder="La date"
              {...register("dateTask")}
              isInvalid={!!errors.dateTask}
            />
            {errors.dateTask && (
              <Form.Control.Feedback type="invalid">
                {errors.dateTask?.message}
              </Form.Control.Feedback>
            )}
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
