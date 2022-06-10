
import tutor_course from '../assets/tutor_course.json';
import getUser from './getUser.js';

const userIsTutor = (to, from, next) => {

    const { user } = getUser();

    debugger;

    let isTutor = tutor_course.find(item => item.email == user.value.email);

    if(isTutor == null){
        next();
    }
    else{
        from();
    }

}

export default userIsTutor

