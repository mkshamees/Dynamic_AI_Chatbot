function RecentUploads({ data }) {

    if (!data) return null;

    return (

        <div
            style={{
                background: "#202123",
                padding: 25,
                borderRadius: 12,
            }}
        >

            <h2>

                🕒 Recent Uploads

            </h2>

            <ul>

                {data.map((file, index) => (

                    <li
                        key={index}
                        style={{
                            marginBottom: 10,
                        }}
                    >

                        {file}

                    </li>

                ))}

            </ul>

        </div>

    );

}

export default RecentUploads;