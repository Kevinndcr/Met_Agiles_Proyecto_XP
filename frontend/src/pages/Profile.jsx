import UserProfile from '../components/profile/UserProfile';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <UserProfile />
      </div>
    </div>
  );
};

export default Profile;