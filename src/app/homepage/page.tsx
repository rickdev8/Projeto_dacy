"use client";

import { useEffect, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";

import styles from "./page.module.css";
import DashboardCard from "@/app/components/DashBoardCard";
import WarehouseTable, { WarehouseRowProps } from "@/app/components/SalesTable";
import AddProductForm from "@/app/components/FormProduct/FormAddProduct";
import EditVendaForm from "@/app/components/EditVenda/EditVenda";
import { ConfirmDelete } from "@/app/components/ConfirmDelete/ConfirmDelete";
import { GetSales } from "../services/GetSales";
import { GetDataSales } from "../services/GetDataSales";

export default function WarehousesPage() {
  const [numero] = useState(29);
  const [editVendaForm, setEditVendaForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [openFormDelete, setOpenFormDelete] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(7);
  const [filter, setFilter] = useState("Todos");
  const [order, setOrder] = useState("Mais recentes");
  const [search, setSearch] = useState("");
  const [sales, setSales] = useState<WarehouseRowProps[]>([]);
  const [dataSaleEdit, setDataSaleEdit] = useState<WarehouseRowProps[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [idEditSale, setIdEditSale] = useState("");
  const [loading, setLoading] = useState(false);
  const [idDeleteSale, setIdDeleteSale] = useState("");
  const [total, setTotal] = useState(0);
  const [totalLucro, setTotalLucro] = useState(0);
  const [lucroDia, setLucroDia] = useState(0);
  const [receita, setReceita] = useState(0);

  const GetSalesTable = async () => {
    setTimeout(async () => {
      const response = await GetSales(page, limit, filter, order, search);
      if (response) {
        setPage(Number(response.data.currentPage));
        setTotalPages(response.data.totalPages);
        setSales([...response.data.sales]);
        setLoading(false);
      }
    }, 800);
  };

  const HandleGetDataSales = async () => {
    setTimeout(async () => {
      const data: any = await GetDataSales();
      if (data) {
        setTotal(data.data.totalVendas);
        setLucroDia(data.data.lucroDoDia);
        setTotalLucro(data.data.lucroTotal);
        setReceita(data.data.totalValorSales);
      }
    }, 800);
  };

  useEffect(() => {
    setLoading(true);
    GetSalesTable();
    HandleGetDataSales();
  }, [page, limit, search, order, filter]);

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Bem vinda, Zoni!</h1>

      <div className={styles.cardsWrapper}>
        <DashboardCard
          title="Total de vendas realizadas:"
          value={total}
          percentage={12}
          color="#7c3aed"
          icon={<FaArrowTrendUp />}
        />
        <DashboardCard
          title="Receita:"
          value={(receita / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
          percentage={12}
          icon={<FaArrowTrendUp />}
        />
        <DashboardCard
          title="Lucro total até o momento:"
          value={(totalLucro / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
          percentage={12}
          icon={<FaArrowTrendUp />}
        />
        <DashboardCard
          title="Lucro do dia:"
          value={(lucroDia / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
          percentage={12}
          icon={<FaArrowTrendUp />}
        />
      </div>

      <h2 className={styles.h2}>Tabela de vendas</h2>

      <div className={styles.topBar}>
        <div className={styles.left}>
          <input
            type="text"
            placeholder="Pesquisar Vendas"
            className={styles.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={styles.filters}
          >
            <option value="Todos">Todos</option>
            <option value="Pago">Pagos</option>
            <option value="Pendente">Pendentes</option>
          </select>

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className={styles.filters2}
          >
            <option value="Mais recentes">Mais Recentes</option>
            <option value="Mais antigos">Mais Antigos</option>
            <option value="Maior preço">Maior preço</option>
            <option value="Menor preço">Menor preço</option>
            <option value="Ordem alfabética">Ordem alfabética</option>
          </select>
        </div>

        <div className={styles.rigth}>
          <button onClick={() => setOpen(true)} className={styles.add}>
            + Nova Venda
          </button>
        </div>
      </div>

      <WarehouseTable
        HandleIdDeleteSale={(id: string) => setIdDeleteSale(id)}
        loading={loading}
        HandleIdEditSale={(id: string) => {
          setIdEditSale(id);
          setEditVendaForm(false);
          HandleGetDataSales();
        }}
        HandleDataSale={(sale: WarehouseRowProps[]) => setDataSaleEdit(sale)}
        warehouseData={sales}
        onFormDelete={(e: boolean) => setOpenFormDelete(e)}
        onFormEdit={(e: boolean) => setEditVendaForm(e)}
      />

      <div className={styles.pagination}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </button>

        <span className={styles.paginationInfo}>
          Página {page} de {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Próximo
        </button>
      </div>

      {open && (
        <AddProductForm
          open={open}
          closeAddProduct={() => {
            setLoading(true);
            setOpen(false);
            GetSalesTable();
            HandleGetDataSales();
          }}
        />
      )}

      {editVendaForm && (
        <EditVendaForm
          open={editVendaForm}
          CloseEditProduct={() => {
            setLoading(true);
            setEditVendaForm(false);
            setIdEditSale("");
            GetSalesTable();
            HandleGetDataSales();
          }}
          dataSale={dataSaleEdit}
          id={idEditSale}
        />
      )}

      {openFormDelete && (
        <ConfirmDelete
          id={idDeleteSale}
          ShowModal={(e: boolean) => setOpenFormDelete(e)}
          open={openFormDelete}
          mensagem="Deseja mesmo deletar essa venda?"
          CloseModal={() => {
            setLoading(true);
            setOpenFormDelete(false);
            GetSalesTable();
            HandleGetDataSales();
          }}
        />
      )}
    </div>
  );
}
