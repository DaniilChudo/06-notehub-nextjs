"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../lib/api";
import { Note } from "../../types/note";
import css from "./NoteList.module.css";

export default function NoteList({ notes }: { notes: Note[] }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <div className={css.footer}>
            <span>{note.tag}</span>

            <div className={css.actions}>
              <Link href={`/notes/${note.id}`}>View details</Link>

              <button onClick={() => mutate(note.id)}>Delete</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
