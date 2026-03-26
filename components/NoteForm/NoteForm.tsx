"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import { NoteTag } from "../../types/note";
import css from "./NoteForm.module.css";

const schema = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string().required(),
});

export default function NoteForm({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
        tag: "Todo" as NoteTag,
      }}
      validationSchema={schema}
      onSubmit={(values) => mutate(values)}
    >
      <Form className={css.form}>
        <Field name="title" placeholder="Title" className={css.input} />
        <ErrorMessage name="title" component="span" />

        <Field
          as="textarea"
          name="content"
          placeholder="Content"
          className={css.textarea}
        />

        <Field as="select" name="tag" className={css.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </Field>

        <div className={css.actions}>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
