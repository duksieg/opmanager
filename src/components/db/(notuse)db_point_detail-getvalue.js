import { doc, getDoc} from "firebase/firestore"; 
import { firebasedb } from "../../utilities/config";

// ref(firebasedb).collection(opName)
// .doc('/tester1/focus_point_detail')
// .onSnapshot(function(doc) {console.log(doc.val());})


const Get_detail_value = async () =>{
    // firebasedb.
    // const ref = firebasedb.ref('/tester1/focus_point_detail');
    // ref.on('value', (snapshot) => {
    //     console.log(snapshot.val());
    //   }, (errorObject) => {
    //     console.log('The read failed: ' + errorObject.name);
    //   }); 
    const ref = doc(firebasedb, "tester1", "focus_point_detail");
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      // Convert to City object
      const city = docSnap.data();
      // Use a City instance method
      console.log(city.toString());
    } else {
      console.log("No such document!");
    }




}

export default Get_detail_value