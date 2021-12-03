import { Profile } from '../../../api/types';
import { followUser } from '../../../api/user';

interface Props {
    user: Profile | undefined;
}

const Bio = ({ user }: Props) => {
    console.log(user);
    if (!user) {
        return <div>Loading</div>;
    }

    const renderFollowing = () => {
        const followClickHandler = async () => {
            await followUser(user.username);
        };

        if (user.following) {
            return <div>Following!</div>;
        }

        return (
            <>
                <div>Currently not following</div>
                <div onClick={followClickHandler}>Click here to follow!</div>
            </>
        );
    };

    return (
        <div className='user-profile-bio'>
            <h3 className='user-profile-bio-username'>{user.username}</h3>
            <div className='user-profile-bio-firstname'>{user.firstName}</div>
            <div className='user-profile-bio-lastname'>{user.lastName}</div>
            <div className='user-profile-bio-follow'>{renderFollowing()}</div>
        </div>
    );
};

export default Bio;
