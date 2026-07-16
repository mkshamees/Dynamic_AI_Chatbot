function SystemStats({ data }) {

    if (!data) return null;

    return (

        <div
            style={{
                background: "#202123",
                padding: 25,
                borderRadius: 12,
                marginTop: 30,
            }}
        >

            <h2>💻 System Information</h2>

            <table
                style={{
                    width: "100%",
                    color: "white",
                    marginTop: 20,
                }}
            >

                <tbody>

                    <tr>
                        <td>Operating System</td>
                        <td>{data.os}</td>
                    </tr>

                    <tr>
                        <td>Python Version</td>
                        <td>{data.python}</td>
                    </tr>

                    <tr>
                        <td>CPU Cores</td>
                        <td>{data.cpu_count}</td>
                    </tr>

                    <tr>
                        <td>Memory</td>
                        <td>{data.memory}</td>
                    </tr>

                </tbody>

            </table>

        </div>

    );

}

export default SystemStats;