import streamlit as st
import pandas as pd
import plotly.express as px


# ============================================================
# B1 - CONFIGURAÇÃO
# ============================================================

# Primeira chamada do Streamlit
st.set_page_config(
    page_title="Patrimônio dos Candidatos - Amazonas 2026",
    layout="wide"
)


# ============================================================
# B1 - CARGA DOS DADOS
# ============================================================

@st.cache_data
def carregar_dados():
    df = pd.read_csv(
        "bens_am_por_candidato.csv"
    )

    # Garante que as colunas numéricas estejam no formato correto
    df["patrimonio_total"] = pd.to_numeric(
        df["patrimonio_total"],
        errors="coerce"
    ).fillna(0)

    df["qtd_bens"] = pd.to_numeric(
        df["qtd_bens"],
        errors="coerce"
    ).fillna(0)

    return df


df = carregar_dados()


# ============================================================
# B1 - TÍTULO E DESCRIÇÃO
# ============================================================

st.title("Patrimônio Declarado dos Candidatos do Amazonas")

st.caption(
    "Análise dos bens declarados pelos candidatos do Amazonas "
    "nas eleições de 2026, utilizando dados públicos do TSE."
)


# ============================================================
# B3 - FILTROS
# ============================================================

st.sidebar.header("Filtros")


# Filtro de cargo
cargos = sorted(
    df["DS_CARGO"]
    .dropna()
    .unique()
)

cargos_selecionados = st.sidebar.multiselect(
    "Cargo",
    options=cargos,
    default=[]
)


# Filtro de partido
partidos = sorted(
    df["SG_PARTIDO"]
    .dropna()
    .unique()
)

partidos_selecionados = st.sidebar.multiselect(
    "Partido",
    options=partidos,
    default=[]
)


# Filtro de gênero
generos = sorted(
    df["DS_GENERO"]
    .dropna()
    .unique()
)

genero_selecionado = st.sidebar.selectbox(
    "Gênero",
    options=["Todos"] + generos
)


# Filtro de patrimônio mínimo
patrimonio_maximo = float(
    df["patrimonio_total"].max()
)

patrimonio_minimo = st.sidebar.slider(
    "Patrimônio mínimo declarado (R$)",
    min_value=0.0,
    max_value=patrimonio_maximo,
    value=0.0,
    step=1000.0
)


# ============================================================
# APLICAÇÃO DOS FILTROS
# ============================================================

df_filtrado = df.copy()


if cargos_selecionados:
    df_filtrado = df_filtrado[
        df_filtrado["DS_CARGO"].isin(cargos_selecionados)
    ]


if partidos_selecionados:
    df_filtrado = df_filtrado[
        df_filtrado["SG_PARTIDO"].isin(partidos_selecionados)
    ]


if genero_selecionado != "Todos":
    df_filtrado = df_filtrado[
        df_filtrado["DS_GENERO"] == genero_selecionado
    ]


df_filtrado = df_filtrado[
    df_filtrado["patrimonio_total"] >= patrimonio_minimo
]


# ============================================================
# B2 - KPIs
# ============================================================

total_declarado = df_filtrado["patrimonio_total"].sum()

numero_candidatos = len(df_filtrado)

patrimonio_medio = (
    df_filtrado["patrimonio_total"].mean()
    if len(df_filtrado) > 0
    else 0
)

patrimonio_mediano = (
    df_filtrado["patrimonio_total"].median()
    if len(df_filtrado) > 0
    else 0
)


# Média geral para comparação
media_geral = df["patrimonio_total"].mean()


# Delta calculado
if media_geral != 0:
    delta_media = (
        (patrimonio_medio - media_geral)
        / media_geral
    ) * 100
else:
    delta_media = 0


col1, col2, col3, col4 = st.columns(4)


with col1:
    st.metric(
        "Patrimônio total",
        f"R$ {total_declarado:,.2f}"
    )


with col2:
    st.metric(
        "👥 Candidatos",
        f"{numero_candidatos:,}"
    )


with col3:
    st.metric(
        "Patrimônio médio",
        f"R$ {patrimonio_medio:,.2f}",
        delta=f"{delta_media:.1f}% vs. média geral"
    )


with col4:
    st.metric(
        "Patrimônio mediano",
        f"R$ {patrimonio_mediano:,.2f}"
    )


# ============================================================
# VERIFICAÇÃO DO FILTRO
# ============================================================

if df_filtrado.empty:

    st.warning(
        "Nenhum candidato corresponde aos filtros selecionados."
    )

else:

    # ========================================================
    # B4 - ORGANIZAÇÃO EM ABAS
    # ========================================================

    aba_visao, aba_candidatos, aba_dados = st.tabs(
        [
            "Visão geral",
            "Ranking",
            "Dados"
        ]
    )


    # ========================================================
    # ABA 1 - VISÃO GERAL
    # ========================================================

    with aba_visao:

        col1, col2 = st.columns(2)


        # -----------------------------------------------
        # Patrimônio por cargo
        # -----------------------------------------------

        with col1:

            patrimonio_cargo = (
                df_filtrado
                .groupby("DS_CARGO")["patrimonio_total"]
                .median()
                .reset_index()
                .sort_values(
                    "patrimonio_total",
                    ascending=False
                )
            )

            fig_cargo = px.bar(
                patrimonio_cargo,
                x="DS_CARGO",
                y="patrimonio_total",
                title="Patrimônio mediano por cargo",
                labels={
                    "DS_CARGO": "Cargo",
                    "patrimonio_total": "Patrimônio mediano (R$)"
                }
            )

            st.plotly_chart(
                fig_cargo,
                use_container_width=True
            )


        # -----------------------------------------------
        # Patrimônio por gênero
        # -----------------------------------------------

        with col2:

            patrimonio_genero = (
                df_filtrado
                .groupby("DS_GENERO")["patrimonio_total"]
                .median()
                .reset_index()
            )

            fig_genero = px.bar(
                patrimonio_genero,
                x="DS_GENERO",
                y="patrimonio_total",
                title="Patrimônio mediano por gênero",
                labels={
                    "DS_GENERO": "Gênero",
                    "patrimonio_total": "Patrimônio mediano (R$)"
                }
            )

            st.plotly_chart(
                fig_genero,
                use_container_width=True
            )


        # -----------------------------------------------
        # Patrimônio por partido
        # -----------------------------------------------

        patrimonio_partido = (
            df_filtrado
            .groupby("SG_PARTIDO")["patrimonio_total"]
            .median()
            .reset_index()
            .sort_values(
                "patrimonio_total",
                ascending=False
            )
            .head(15)
        )


        fig_partido = px.bar(
            patrimonio_partido,
            x="SG_PARTIDO",
            y="patrimonio_total",
            title="15 partidos com maior patrimônio mediano",
            labels={
                "SG_PARTIDO": "Partido",
                "patrimonio_total": "Patrimônio mediano (R$)"
            }
        )


        st.plotly_chart(
            fig_partido,
            use_container_width=True
        )


    # ========================================================
    # ABA 2 - RANKING
    # ========================================================

    with aba_candidatos:

        st.subheader("🏆 Ranking dos candidatos por patrimônio")

        ranking = (
            df_filtrado
            .sort_values(
                "patrimonio_total",
                ascending=False
            )
            .head(20)
        )


        fig_ranking = px.bar(
            ranking,
            x="patrimonio_total",
            y="NM_URNA_CANDIDATO",
            color="SG_PARTIDO",
            orientation="h",
            title="20 maiores patrimônios declarados",
            labels={
                "patrimonio_total": "Patrimônio total (R$)",
                "NM_URNA_CANDIDATO": "Candidato",
                "SG_PARTIDO": "Partido"
            }
        )


        st.plotly_chart(
            fig_ranking,
            use_container_width=True
        )


    # ========================================================
    # ABA 3 - DADOS
    # ========================================================

    with aba_dados:

        st.subheader("Dados dos candidatos")

        st.dataframe(
            df_filtrado,
            use_container_width=True,
            hide_index=True
        )


        # ====================================================
        # B5 - EXPORTAÇÃO
        # ====================================================

        csv_download = df_filtrado.to_csv(
            index=False
        ).encode("utf-8")


        st.download_button(
            label="Baixar dados filtrados",
            data=csv_download,
            file_name="bens_am_filtrado.csv",
            mime="text/csv"
        )


# ============================================================
# RODAPÉ
# ============================================================

st.divider()

st.caption(
    "Fonte: Tribunal Superior Eleitoral (TSE) — Dados Abertos. "
    "Análise referente aos candidatos do Amazonas nas eleições de 2026."
)
