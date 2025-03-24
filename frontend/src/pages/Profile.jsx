import UserProfile from "../components/UserProfile";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

const Profile = () => {
    
    const { id } = useParams();

    return (
        <>
            <Header renderButtons={false}/>
            <UserProfile userId={id}/>
        </>
    );

};

export default Profile;