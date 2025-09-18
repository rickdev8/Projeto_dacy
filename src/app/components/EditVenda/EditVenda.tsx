"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./EditVenda.module.css";
import { Mask } from "@/app/utils/Mask";
import { MdClose } from "react-icons/md";
import { FindSale } from "@/app/services/FindSale";
import { WarehouseRowProps } from "../SalesTable";
import { EditSale } from "@/app/services/EditSale";

interface AddProductFormProps {
  CloseEditProduct: () => void;
  open: boolean;
  dataSale: WarehouseRowProps[];
  id: string;
}

export default function EditVendaForm({
  CloseEditProduct,
  open,
  dataSale,
  id,
}: AddProductFormProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [nomeProduto, setNomeProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [precoVenda, setPrecoVenda] = useState("");
  const [precoCusto, setPrecoCusto] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("Pix");
  const [statusPagamento, setStatusPagamento] = useState<string>("Pago");

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [open]);

  useEffect(() => {
    if (dataSale.length != 0) {
      setNomeProduto(dataSale[0].nomeProduto);
      setMetodoPagamento(dataSale[0].metodoPagamento);
      setPrecoCusto(dataSale[0].precoCusto);
      setPrecoVenda(dataSale[0].precoVenda);
      setStatusPagamento(dataSale[0].statusPagamento);
      setQuantidade(dataSale[0].quantidadeProduto);
    }
  }, [dataSale]);

  const HandleEditSale = async (e: any) => {
    e.preventDefault();
    if (Number(quantidade) < 0) {
      window.alert("A quantidad deve ser maior do que 0!");
      return;
    }
    const sale: WarehouseRowProps = {
      metodoPagamento,
      nomeProduto,
      precoVenda,
      precoCusto,
      quantidadeProduto: quantidade,
      statusPagamento: statusPagamento,
      id: "",
      data: "",
    };

    await EditSale(id, sale);

    CloseEditProduct();
    dialogRef.current?.close();
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Editar Venda</h2>
          <button
            className={styles.close}
            onClick={() => {
              dialogRef.current?.close();
              CloseEditProduct();
            }}
          >
            <MdClose size={25} />
          </button>
        </div>

        <form className={styles.form} onSubmit={HandleEditSale}>
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
              <div className={styles.field}>
                <div className={styles.field}>
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
              </div>
            </div>
            <div className={styles.field}>
              <label>Metodo Pagamento</label>
              <select
                value={metodoPagamento}
                onChange={(e) => setMetodoPagamento(e.target.value)}
                required
                className={styles.select}
              >
                <option value="">Selecione o método</option>
                <option value="Pix">Pix</option>
                <option value="Cartao">Cartão</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Boleto">Boleto</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Status Pagamento</label>
              <select
                value={statusPagamento}
                onChange={(e) => setStatusPagamento(e.target.value)}
                required
                className={styles.select}
              >
                <option value="">Selecione o método</option>
                <option value="Pendente">Pendente</option>
                <option value="Pago">Pago</option>6
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
            Editar
          </button>
        </form>
      </div>
    </dialog>
  );
}
