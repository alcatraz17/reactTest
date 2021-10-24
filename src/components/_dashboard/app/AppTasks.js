import PropTypes from "prop-types";
import { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
// material
import {
  Box,
  Card,
  Checkbox,
  CardHeader,
  Typography,
  FormControlLabel,
  Stack
} from "@mui/material";

// ----------------------------------------------------------------------

let TASKS = [
  "Create FireStone Logo",
  "Add SCSS and JS files if required",
  "Stakeholder Meeting",
  "Scoping & Estimations",
  "Sprint Showcase"
];

// ----------------------------------------------------------------------

TaskItem.propTypes = {
  task: PropTypes.string,
  checked: PropTypes.bool,
  formik: PropTypes.object
};

function TaskItem({ task, checked, formik, ...other }) {
  const { getFieldProps } = formik;
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ py: 0.75 }}>
      <FormControlLabel
        control={
          <Checkbox
            {...getFieldProps("checked")}
            value={task}
            checked={checked}
            {...other}
          />
        }
        label={
          <Typography
            variant="body2"
            sx={{
              ...(checked && {
                color: "text.disabled",
                textDecoration: "line-through"
              })
            }}
          >
            {task}
          </Typography>
        }
      />
    </Stack>
  );
}

export default function AppTasks() {
  const [list, setList] = useState("");
  const [tasks, setTasks] = useState(TASKS);
  const addTask = () => {
    if (!list || /^\s*$/.test(list)) {
      alert("Task can not be empty!");
    } else {
      setTasks([...tasks, list]);
    }
    setList("");
  };

  // console.log(TASKS);
  const itemEvent = (event) => {
    setList(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      checked: [TASKS[2]]
    },
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const { values, handleSubmit } = formik;

  return (
    <Card>
      <CardHeader title="Tasks" />
      <Box sx={{ px: 3, py: 1 }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {tasks.map((task, index) => (
              <TaskItem
                task={task}
                formik={formik}
                checked={values.checked.includes(task)}
                key={index}
              />
            ))}
            <input
              type="text"
              value={list}
              placeholder="Enter your task..."
              onChange={itemEvent}
            />
            <button
              type="button"
              className="btn btn-light my-2 mx-1"
              onClick={addTask}
            >
              Add task
            </button>
          </Form>
        </FormikProvider>
      </Box>
    </Card>
  );
}
