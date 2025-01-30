import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt

st.title('Analytics Dashboard')

# Upload CSV file
upload_file = st.file_uploader("Upload a CSV file", type="csv")

if upload_file is not None:
    df = pd.read_csv(upload_file)

    # Display Data Preview
    st.subheader("Data Preview")
    st.write(df.head())  # Corrected preview

    # Display Data Summary
    st.subheader("Data Summary")
    st.write(df.describe())  # ✅ Fixed error

    # Filter Data
    st.subheader("Filter")
    col = df.columns.to_list()
    selected_column = st.selectbox("Select column to filter", col)

    unique_values = df[selected_column].unique()
    selected_value = st.selectbox("Select value", unique_values)

    # Filtered Data Preview
    filtered_df = df[df[selected_column] == selected_value]
    st.write(filtered_df)

    # Plot Data
    st.subheader("Plot Data")
    x_col = st.selectbox("Select X-axis column", df.columns)
    y_col = st.selectbox("Select Y-axis column", df.columns)

    if st.button("Generate Plot"):
        fig, ax = plt.subplots()
        ax.plot(df[x_col], df[y_col], marker="o")
        st.pyplot(fig)  # ✅ Use st.pyplot() instead of st.line_chart()
    else:
        st.write("Upload a file and select options.")