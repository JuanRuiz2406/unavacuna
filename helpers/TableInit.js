import React, { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

export const TableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export const TableLocalization = {
  body: {
    emptyDataSourceMessage: "No hay registros para mostrar",
    addTooltip: "Agregar",
    deleteTooltip: "Eliminar",
    editTooltip: "Editar",
    filterRow: {
      filterTooltip: "Filtrar",
    },
    editRow: {
      deleteText: "¿Quieres borrar esta línea?",
      cancelTooltip: "Anular",
      saveTooltip: "Registro",
    },
  },
  grouping: {
    placeholder: "Tire del encabezado ...",
    groupedBy: "Agrupar por:",
  },
  header: {
    actions: "Acciones",
  },
  pagination: {
    labelDisplayedRows: "{from}-{to} de {count}",
    labelRowsSelect: "líneas",
    labelRowsPerPage: "líneas por página:",
    firstAriaLabel: "Primera página",
    firstTooltip: "Primera página",
    previousAriaLabel: "Página anterior",
    previousTooltip: "Página anterior",
    nextAriaLabel: "Siguiente página",
    nextTooltip: "Siguiente página",
    lastAriaLabel: "Última página",
    lastTooltip: "Última página",
  },
  toolbar: {
    addRemoveColumns: "Agregar o quitar columnas",
    nRowsSelected: "{0} línea(s) seleccionada(s)",
    showColumnsTitle: "Ver columnas",
    showColumnsAriaLabel: "Ver columnas",
    exportTitle: "Exportar",
    exportAriaLabel: "Exportar",
    exportName: "Exportar en CSV",
    searchTooltip: "Buscar",
    searchPlaceholder: "Buscar",
    exportCSVName: "Descargar en EXEL",
    exportPDFName: "Descargar en PDF",
  },
};

export const TableOptions = {
  showTitle: false,
  headerStyle: { background: "#404A59", color: "white" },
  rowStyle: {
    color: "#1F3A8A",
  },
  pageSizeOptions: [5, 10, 30, 50, 100],
  actionsColumnIndex: -1,
  pageSize: 10,
  exportButton: true,
};
