import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Profile as UserProfile } from '../api/types';
import { getUserProfile } from '../api/user';
import Bio from '../features/User/Profile/Bio';
import FavoritedBooks from '../features/User/Profile/FavoritedBooks';

const Profile = () => {
    const [user, setUser] = useState<UserProfile>();
    const { username } = useParams();
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            if (typeof username !== 'string') {
                setError(true);
                return;
            }
            setUser(await getUserProfile(username));
        }
        fetchUser();
    }, [username]);

    // favorited by this user
    // created by this user

    // if user is self, then get bookfeed?

    if (!username) {
        return null;
    }

    return (
        <div className='profile-page'>
            {username && (
                <>
                    <Bio user={user} /> <FavoritedBooks username={username} />
                </>
            )}
        </div>
    );
};

export default Profile;
