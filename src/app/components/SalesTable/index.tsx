"use client";

import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";

import styles from "./SalesTable.module.css";
import { useEffect, useState } from "react";
import { GetSales } from "@/app/services/GetSales";
import { formatCurrency } from "@/app/utils/FormatCurrency";
import { FindSale } from "@/app/services/FindSale";
import { Loading } from "../Loading/Loading";
import { DeleteSale } from "@/app/services/DeleteSale";

export interface WarehouseRowProps {
  id: string;
  nomeProduto: string;
  metodoPagamento: string;
  precoCusto: string;
  precoVenda: string;
  statusPagamento: string;
  data: string;
  quantidadeProduto: string;
}

type EditVendaFormProps = {
  onFormEdit: (e: boolean) => void;
  onFormDelete: (e: boolean) => void;
  warehouseData: WarehouseRowProps[];
  HandleDataSale: (sale: any) => any;
  HandleIdEditSale: (id: string) => void;
  loading: boolean;
  HandleIdDeleteSale: (id: string) => void;
};

export default function WarehouseTable({
  onFormEdit,
  onFormDelete,
  warehouseData,
  HandleDataSale,
  HandleIdEditSale,
  loading,
  HandleIdDeleteSale,
}: EditVendaFormProps) {
  const [sales, setSales] = useState<WarehouseRowProps[]>([]);
  const [idSale, setIdSale] = useState("");

  useEffect(() => {
    setSales(warehouseData);
  }, [warehouseData]);

  const GetSale = async () => {
    if (idSale.trim() != "") {
      const response = await FindSale(idSale);
      await HandleDataSale(response);
      onFormEdit(true);
    }
  };

  useEffect(() => {
    GetSale();
    HandleIdEditSale(idSale);
  }, [idSale]);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome produto</th>
            <th>Metodo pagamento</th>
            <th>Preco de custo</th>
            <th>Preco de venda</th>
            <th>Quantidade</th>
            <th>Status</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className={styles.loadingCell}>
                <Loading />
              </td>
            </tr>
          ) : (
            sales.map((w, i) => (
              <tr key={i} className={styles.row}>
                <td>{w.nomeProduto}</td>
                <td className={styles.id}>{w.metodoPagamento}</td>
                <td>{formatCurrency(Number(w.precoCusto) / 100)}</td>
                <td>{formatCurrency(Number(w.precoVenda) / 100)}</td>
                <td>{w.quantidadeProduto}</td>
                <td>{w.statusPagamento}</td>
                <td>
                  {new Date(w.data).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className={styles.actions}>
                  <FiEdit2
                    onClick={() => {
                      setIdSale(w.id);
                      onFormEdit(true);
                    }}
                    size={20}
                    className={styles.iconEdit}
                  />
                  <FiTrash2
                    onClick={() => {
                      HandleIdDeleteSale(w.id);
                      onFormDelete(true);
                    }}
                    size={20}
                    className={styles.iconDelete}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
