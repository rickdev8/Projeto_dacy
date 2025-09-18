import { useEffect, useRef } from "react";

import styles from "./ConfirmDelete.module.css";
import { DeleteSale } from "@/app/services/DeleteSale";

export type PropsDelete = {
  mensagem: string;
  ShowModal: (e: boolean) => void;
  open: boolean;
  id: string;
  CloseModal: () => void;
};

export const ConfirmDelete = ({
  mensagem,
  ShowModal,
  CloseModal,
  open,
  id,
}: PropsDelete) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (dialogRef.current && open) {
      dialogRef.current.showModal();
    }
  }, [open]);

  const HandleDelete = async () => {
    DeleteSale(id);
    CloseModal();
  };

  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <h1 className={styles.title}>{mensagem}</h1>
          <div className={styles.buttons}>
            <button onClick={() => ShowModal(false)} className={styles.cancel}>
              Cancelar
            </button>
            <button onClick={() => HandleDelete()} className={styles.confirm}>
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};
