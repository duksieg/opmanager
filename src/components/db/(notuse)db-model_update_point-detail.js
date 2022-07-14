import { getDatabase, ref, query, orderByChild, onValue,update } from "firebase/database"

import { firebasedb } from "../../utilities/config"


const Update_point_detail = (props) => {
    const updates ={};
    updates["/tester1/point_detail"]=props.point_code
    console.log(updates)
    update(ref(firebasedb), updates)

    return (
        <>
            {/* <div>Update_point_detail</div> */}
        </>
    )
}

export default Update_point_detail