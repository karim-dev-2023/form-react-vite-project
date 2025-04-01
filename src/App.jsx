import "./App.css";
import { Container, FloatingLabel, Form, Button } from "react-bootstrap";

import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    priority: "1",
    taskComplete: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData, // On décompose le formulaire existant pour garder toutes les valeurs
      [name]: type === "checkbox" ? checked : value,   // On change le comportement selon le type
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          {/* Nom */}
          <FloatingLabel
            controlId="floatingName"
            label="Nom"
            className="mb-3 mt-5"
          >
            <Form.Control
              type="text"
              placeholder="Rimk"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          {/* Date */}
          <FloatingLabel controlId="floatingdate" label="Date" className="mb-3">
            <Form.Control
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
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
              name="priority"
              value={formData.priority}
              onChange={handleChange}
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
            name="taskComplete"
            value={formData.taskComplete}
            onChange={handleChange}
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
