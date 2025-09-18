"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./FormAddProduct.module.css";
import { Mask } from "@/app/utils/Mask";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { CreateSales } from "@/app/services/CreateSales";

interface AddProductFormProps {
  closeAddProduct: () => void;
  open: boolean;
}

export default function AddProductForm({
  closeAddProduct,
  open,
}: AddProductFormProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [nomeProduto, setNomeProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [precoVenda, setPrecoVenda] = useState("");
  const [precoCusto, setPrecoCusto] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("Pix");
  const [statusPagamento, setStatusPagamento] = useState("Pago");

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [open]);

  const HandleSubmit = async (e: React.FormEvent) => {
    if (Number(quantidade) < 0) {
      window.alert("A quantidad deve ser maior do que 0!");
      return;
    }
    e.preventDefault();

    const sale = {
      nomeProduto,
      quantidadeProduto: quantidade,
      metodoPagamento,
      statusPagamento,
      precoVenda,
      precoCusto,
    };

    try {
      await CreateSales(sale);
      setNomeProduto("");
      setQuantidade("");
      setPrecoVenda("");
      setPrecoCusto("");
      setMetodoPagamento("Pix");
      setStatusPagamento("Pago");
      dialogRef.current?.close();
      closeAddProduct();
    } catch (err) {
      console.error("Erro ao enviar venda:", err);
    }
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Adicionar Venda</h2>
          <button
            className={styles.close}
            onClick={() => {
              dialogRef.current?.close();
              closeAddProduct();
            }}
          >
            <MdClose size={25} />
          </button>
        </div>

        <form className={styles.form} onSubmit={HandleSubmit}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Nome do Produto</label>
              <input
                required
                type="text"
                maxLength={50}
                value={nomeProduto}
                onChange={(e) => setNomeProduto(e.target.value)}
                placeholder="Ex: BoomHigh"
              />
            </div>

            <div className={styles.field}>
              <label>Quantidade</label>
              <input
                min={1}
                required
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={quantidade}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) setQuantidade(val);
                }}
                placeholder="Ex: 100"
              />
            </div>

            <div className={styles.field}>
              <label>Método de Pagamento</label>
              <select
                required
                className={styles.select}
                value={metodoPagamento}
                onChange={(e) => setMetodoPagamento(e.target.value)}
              >
                <option value="">Selecione o método</option>
                <option value="Pix">Pix</option>
                <option value="Cartao">Cartão</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Boleto">Boleto</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Status do Pagamento</label>
              <select
                required
                className={styles.select}
                value={statusPagamento}
                onChange={(e) => setStatusPagamento(e.target.value)}
              >
                <option value="">Selecione o status</option>
                <option value="Pago">Pago</option>
                <option value="Pendente">Pendente</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Preço de Venda</label>
              <input
                required
                type="text"
                maxLength={15}
                value={Mask(precoVenda)}
                onChange={(e) =>
                  setPrecoVenda(e.target.value.replace(/\D/g, ""))
                }
                placeholder="Ex: R$ 100"
              />
            </div>

            <div className={styles.field}>
              <label>Preço de Custo</label>
              <input
                required
                type="text"
                maxLength={15}
                value={Mask(precoCusto)}
                onChange={(e) =>
                  setPrecoCusto(e.target.value.replace(/\D/g, ""))
                }
                placeholder="Ex: R$ 80"
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Adicionar Venda
          </button>
        </form>
      </div>
    </dialog>
  );
}
