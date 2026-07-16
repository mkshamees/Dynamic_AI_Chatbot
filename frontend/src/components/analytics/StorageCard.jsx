function StorageCard({ data }) {

    if (!data) return null;

    return (

        <div
            style={{
                background: "#202123",
                padding: 25,
                borderRadius: 12,
                marginBottom: 30,
            }}
        >

            <h2>💾 Storage</h2>

            <h1>

                {data.total_storage_mb} MB

            </h1>

            <p>

                Indexed Chunks

            </p>

            <h3>

                {data.total_chunks}

            </h3>

        </div>

    );

}

export default StorageCard;