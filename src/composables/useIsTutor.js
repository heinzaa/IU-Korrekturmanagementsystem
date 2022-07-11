
import tutor_course from '../assets/tutor_course.json';
import getUser from './getUser.js';
import { ref } from 'vue';

const userIsTutor = () => {

    const { user } = getUser();
    let isTutor = ref(false);

    // Falls eingeloggt
    if(user.value){
        
        
        let oTutor = tutor_course.find(item => item.email == user.value.email);

        if(oTutor == null){
            isTutor.value = false;
            
        }
        else{
            isTutor.value = true;
            
        }

    }
    
    return { isTutor };

}

export default userIsTutor

