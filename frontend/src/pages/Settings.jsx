import { useState } from "react";

function Settings() {
    const [activeTab, setActiveTab] = useState("profile");

    const tabs = [
        { id: "profile", label: "👤 Profile" },
        { id: "security", label: "🔐 Security" },
        { id: "ai", label: "🤖 AI" },
        { id: "memory", label: "🧠 Memory" },
        { id: "appearance", label: "🎨 Appearance" },
        { id: "notifications", label: "🔔 Notifications" },
        { id: "danger", label: "🚨 Danger Zone" },
    ];

    return (
        <div
            style={{
                background: "#343541",
                minHeight: "100vh",
                color: "white",
                padding: "30px",
            }}
        >
            <h1 style={{ marginBottom: 25 }}>
                ⚙ Settings
            </h1>

            {/* Tabs */}

            <div
                style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginBottom: 30,
                }}
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: "10px 18px",
                            border: "none",
                            borderRadius: 10,
                            cursor: "pointer",
                            background:
                                activeTab === tab.id
                                    ? "#10a37f"
                                    : "#202123",
                            color: "white",
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div
                style={{
                    background: "#202123",
                    borderRadius: 15,
                    padding: 30,
                }}
            >
                {/* ======================= */}
                {/* PROFILE */}
                {/* ======================= */}

                {activeTab === "profile" && (
                    <>
                        <h2>👤 Profile Settings</h2>

                        <div style={{ marginTop: 20 }}>
                            <label>Full Name</label>

                            <input
                                type="text"
                                placeholder="Your Name"
                                style={inputStyle}
                            />
                        </div>

                        <div style={{ marginTop: 20 }}>
                            <label>Email</label>

                            <input
                                type="email"
                                placeholder="email@example.com"
                                style={inputStyle}
                            />
                        </div>

                        <div style={{ marginTop: 20 }}>
                            <label>Username</label>

                            <input
                                type="text"
                                placeholder="Username"
                                style={inputStyle}
                            />
                        </div>

                        <button style={buttonStyle}>
                            Save Changes
                        </button>
                    </>
                )}

                {/* ======================= */}
                {/* SECURITY */}
                {/* ======================= */}

                {activeTab === "security" && (
                    <>
                        <h2>🔐 Security</h2>

                        <input
                            type="password"
                            placeholder="Current Password"
                            style={inputStyle}
                        />

                        <input
                            type="password"
                            placeholder="New Password"
                            style={inputStyle}
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            style={inputStyle}
                        />

                        <button style={buttonStyle}>
                            Update Password
                        </button>
                    </>
                )}

                {/* ======================= */}
                {/* AI */}
                {/* ======================= */}

                {activeTab === "ai" && (
                    <>
                        <h2>🤖 AI Configuration</h2>

                        <label>AI Provider</label>

                        <select style={inputStyle}>
                            <option>Groq</option>
                            <option>OpenAI</option>
                            <option>Ollama</option>
                        </select>

                        <label>Temperature</label>

                        <input
                            type="number"
                            defaultValue="0.7"
                            style={inputStyle}
                        />

                        <label>Max Tokens</label>

                        <input
                            type="number"
                            defaultValue="2048"
                            style={inputStyle}
                        />

                        <button style={buttonStyle}>
                            Save AI Settings
                        </button>
                    </>
                )}

                {/* ======================= */}
                {/* MEMORY */}
                {/* ======================= */}

                {activeTab === "memory" && (
                    <>
                        <h2>🧠 Memory Settings</h2>

                        <div style={checkboxStyle}>
                            <input type="checkbox" defaultChecked />
                            Enable Long-Term Memory
                        </div>

                        <div style={checkboxStyle}>
                            <input type="checkbox" defaultChecked />
                            Enable Semantic Search
                        </div>

                        <div style={checkboxStyle}>
                            <input type="checkbox" defaultChecked />
                            Save Conversations Automatically
                        </div>

                        <button style={buttonStyle}>
                            Save Memory Settings
                        </button>
                    </>
                )}

                {/* ======================= */}
                {/* APPEARANCE */}
                {/* ======================= */}

                {activeTab === "appearance" && (
                    <>
                        <h2>🎨 Appearance</h2>

                        <div style={checkboxStyle}>
                            <input type="radio" name="theme" defaultChecked />
                            Dark Theme
                        </div>

                        <div style={checkboxStyle}>
                            <input type="radio" name="theme" />
                            Light Theme
                        </div>

                        <button style={buttonStyle}>
                            Save Appearance
                        </button>
                    </>
                )}

                {/* ======================= */}
                {/* NOTIFICATIONS */}
                {/* ======================= */}

                {activeTab === "notifications" && (
                    <>
                        <h2>🔔 Notifications</h2>

                        <div style={checkboxStyle}>
                            <input type="checkbox" defaultChecked />
                            Email Notifications
                        </div>

                        <div style={checkboxStyle}>
                            <input type="checkbox" defaultChecked />
                            Desktop Notifications
                        </div>

                        <button style={buttonStyle}>
                            Save Notification Settings
                        </button>
                    </>
                )}

                {/* ======================= */}
                {/* DANGER */}
                {/* ======================= */}

                {activeTab === "danger" && (
                    <>
                        <h2 style={{ color: "#ff4d4f" }}>
                            🚨 Danger Zone
                        </h2>

                        <button
                            style={{
                                ...buttonStyle,
                                background: "#e53935",
                            }}
                        >
                            Export Conversations
                        </button>

                        <button
                            style={{
                                ...buttonStyle,
                                background: "#b71c1c",
                            }}
                        >
                            Delete Account
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 8,
    border: "1px solid #555",
    background: "#343541",
    color: "white",
};

const buttonStyle = {
    marginTop: 20,
    padding: "12px 24px",
    border: "none",
    borderRadius: 8,
    background: "#10a37f",
    color: "white",
    cursor: "pointer",
};

const checkboxStyle = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 15,
};

export default Settings;