import UserProfile from "../components/UserProfile";
import Header from "../components/Header";

const Profile = () => {
    
    return (
        <>
            <Header renderButtons={false}/>
            <UserProfile />
        </>
    );

};

export default Profile;