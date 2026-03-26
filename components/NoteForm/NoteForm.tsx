"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import { NoteTag } from "../../types/note";
import css from "./NoteForm.module.css";

// Визначення дозволених тегів для валідації
const VALID_TAGS: NoteTag[] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

const schema = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string().oneOf(VALID_TAGS).required(), // Покращена валідація
});

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
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
        <ErrorMessage name="title" component="span" className={css.error} />

        <Field
          as="textarea"
          name="content"
          placeholder="Content"
          className={css.textarea}
        />

        <Field as="select" name="tag" className={css.select}>
          {VALID_TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </Field>

        <div className={css.actions}>
          <button type="button" onClick={onClose} className={css.button}>
            Cancel
          </button>
          <button type="submit" disabled={isPending} className={css.button}>
            {isPending ? "Creating..." : "Create"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
