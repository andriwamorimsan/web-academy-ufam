from pathlib import Path

import pandas as pd
import plotly.express as px
import streamlit as st


st.set_page_config(
    page_title="Patrimônio dos candidatos do Amazonas",
    page_icon="📊",
    layout="wide",
)

CSV_PATH = Path(__file__).with_name("bens_am_por_candidato.csv")


@st.cache_data
def carregar_dados() -> pd.DataFrame:
    return pd.read_csv(CSV_PATH)


st.title("Patrimônio declarado dos candidatos do Amazonas")
st.caption(
    "Eleições 2026 · Dados públicos do TSE agregados por candidato. "
    "Os valores representam bens declarados, não patrimônio auditado."
)

df = carregar_dados()
if df.empty:
    st.warning(
        "O CSV está sem registros. Execute as células A1–A4 do analise.ipynb "
        "depois de disponibilizar os arquivos do TSE."
    )
    st.stop()

df["patrimonio_total"] = pd.to_numeric(df["patrimonio_total"], errors="coerce").fillna(0)
df["qtd_bens"] = pd.to_numeric(df["qtd_bens"], errors="coerce").fillna(0).astype(int)

st.sidebar.header("Filtros")
cargos = sorted(df["DS_CARGO"].dropna().unique())
partidos = sorted(df["SG_PARTIDO"].dropna().unique())
generos = sorted(df["DS_GENERO"].dropna().unique())
selecionados_cargos = st.sidebar.multiselect("Cargo", cargos, default=cargos)
selecionados_partidos = st.sidebar.multiselect("Partido", partidos, default=partidos)
selecionado_genero = st.sidebar.selectbox("Gênero", ["Todos"] + generos)
limite = float(df["patrimonio_total"].max())
patrimonio_minimo = st.sidebar.slider(
    "Patrimônio mínimo (R$)", 0.0, limite, 0.0, step=max(limite / 100, 1.0)
)

filtrado = df[
    df["DS_CARGO"].isin(selecionados_cargos)
    & df["SG_PARTIDO"].isin(selecionados_partidos)
    & (df["patrimonio_total"] >= patrimonio_minimo)
]
if selecionado_genero != "Todos":
    filtrado = filtrado[filtrado["DS_GENERO"].eq(selecionado_genero)]

total_geral = df["patrimonio_total"].sum()
total_filtrado = filtrado["patrimonio_total"].sum()
delta_total = total_filtrado - total_geral
col1, col2, col3, col4 = st.columns(4)
col1.metric("Patrimônio no recorte", f"R$ {total_filtrado:,.2f}", f"R$ {delta_total:,.2f}")
col2.metric("Candidatos", f"{len(filtrado):,}")
col3.metric(
    "Patrimônio mediano",
    f"R$ {filtrado['patrimonio_total'].median():,.2f}" if not filtrado.empty else "R$ 0,00",
)
col4.metric("Bens declarados", f"{filtrado['qtd_bens'].sum():,}")

tab_visao, tab_ranking = st.tabs(["Comparações", "Ranking"])
with tab_visao:
    esquerda, direita = st.columns(2)
    por_cargo = (
        filtrado.groupby("DS_CARGO", as_index=False)["patrimonio_total"]
        .median()
        .sort_values("patrimonio_total", ascending=False)
    )
    esquerda.plotly_chart(
        px.bar(
            por_cargo,
            x="patrimonio_total",
            y="DS_CARGO",
            orientation="h",
            title="Patrimônio mediano por cargo",
            labels={"patrimonio_total": "Mediana (R$)", "DS_CARGO": "Cargo"},
        ),
        use_container_width=True,
    )
    por_genero = filtrado.groupby("DS_GENERO", as_index=False)["patrimonio_total"].median()
    direita.plotly_chart(
        px.bar(
            por_genero,
            x="DS_GENERO",
            y="patrimonio_total",
            title="Patrimônio mediano por gênero",
            labels={"patrimonio_total": "Mediana (R$)", "DS_GENERO": "Gênero"},
        ),
        use_container_width=True,
    )

with tab_ranking:
    ranking = filtrado.sort_values("patrimonio_total", ascending=False).head(20)
    st.plotly_chart(
        px.bar(
            ranking,
            x="patrimonio_total",
            y="NM_URNA_CANDIDATO",
            color="SG_PARTIDO",
            orientation="h",
            title="20 maiores patrimônios no recorte",
            labels={"patrimonio_total": "Patrimônio (R$)", "NM_URNA_CANDIDATO": "Candidato"},
        ),
        use_container_width=True,
    )
    st.dataframe(ranking, use_container_width=True, hide_index=True)

st.download_button(
    "Baixar recorte filtrado (CSV)",
    data=filtrado.to_csv(index=False).encode("utf-8"),
    file_name="bens_am_recorte.csv",
    mime="text/csv",
)
