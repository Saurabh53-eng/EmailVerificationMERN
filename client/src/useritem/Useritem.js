import React from 'react'
import '../useritem/Useritem.css'
const Useritem = (props) => {
    const { User } = props;
    const handleClick=(e)=>{
        e.preventDefault();
    }

    return (
        <div>
            <div className="card" style={{ width: "40%" }}>
                <div className="card-body">
                    <h5 className="card-title">{User.firstName}  {User.lastName}</h5>
                    <h5 className="card-text">{User.email}</h5>
                    <div className="modal-header" style={{paddingLeft:"80%"}}>
                    <button  onClick={handleClick} type="button" className="btn btn-primary" >Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Useritem