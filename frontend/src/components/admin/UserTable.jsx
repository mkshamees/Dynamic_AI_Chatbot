import {
    FiCheck,
    FiX,
    FiShield,
    FiUser,
    FiTrash2,
} from "react-icons/fi";

import adminService from "../../services/adminService";

function UserTable({

    users,

}) {

    // ==========================================
    // Refresh Page
    // ==========================================

    const refresh = () => {

        window.location.reload();

    };

    // ==========================================
    // Activate
    // ==========================================

    const activate = async(id)=>{

        await adminService.activateUser(id);

        refresh();

    };

    // ==========================================
    // Deactivate
    // ==========================================

    const deactivate = async(id)=>{

        await adminService.deactivateUser(id);

        refresh();

    };

    // ==========================================
    // Promote
    // ==========================================

    const promote = async(id)=>{

        await adminService.promoteUser(id);

        refresh();

    };

    // ==========================================
    // Demote
    // ==========================================

    const demote = async(id)=>{

        await adminService.demoteUser(id);

        refresh();

    };

    // ==========================================
    // Delete
    // ==========================================

    const remove = async(id)=>{

        if(

            !window.confirm(

                "Delete this user?"

            )

        ) return;

        await adminService.deleteUser(id);

        refresh();

    };

    return(

        <div className="admin-section">

            <h2>

                👥 User Management

            </h2>

            <div className="table-wrapper">

                <table className="admin-table">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Username</th>

                            <th>Email</th>

                            <th>Role</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            users.map(user=>(

                                <tr key={user.id}>

                                    <td>

                                        {user.id}

                                    </td>

                                    <td>

                                        {user.username}

                                    </td>

                                    <td>

                                        {user.email}

                                    </td>

                                    <td>

                                        {

                                            user.role==="admin"

                                            ?

                                            <span className="badge badge-warning">

                                                <FiShield />

                                                &nbsp;

                                                Admin

                                            </span>

                                            :

                                            <span className="badge badge-info">

                                                <FiUser />

                                                &nbsp;

                                                User

                                            </span>

                                        }

                                    </td>

                                    <td>

                                        {

                                            user.is_active

                                            ?

                                            <span className="badge badge-success">

                                                Active

                                            </span>

                                            :

                                            <span className="badge badge-danger">

                                                Inactive

                                            </span>

                                        }

                                    </td>

                                    <td>

                                        <div className="table-actions">

                                            {

                                                user.is_active

                                                ?

                                                <button

                                                    className="action-btn btn-orange"

                                                    onClick={()=>deactivate(user.id)}

                                                >

                                                    <FiX/>

                                                </button>

                                                :

                                                <button

                                                    className="action-btn btn-green"

                                                    onClick={()=>activate(user.id)}

                                                >

                                                    <FiCheck/>

                                                </button>

                                            }

                                            {

                                                user.role==="admin"

                                                ?

                                                <button

                                                    className="action-btn btn-blue"

                                                    onClick={()=>demote(user.id)}

                                                >

                                                    User

                                                </button>

                                                :

                                                <button

                                                    className="action-btn btn-blue"

                                                    onClick={()=>promote(user.id)}

                                                >

                                                    Admin

                                                </button>

                                            }

                                            <button

                                                className="action-btn btn-red"

                                                onClick={()=>remove(user.id)}

                                            >

                                                <FiTrash2/>

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default UserTable;