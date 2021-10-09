import Auth from '../../src/components/auth/Auth';
import { UseUser } from '../../src/components/hooks/UseUser';

const Vaccine = () => {
  const { user, logout } = UseUser();

  return (
    <div >
      <div>Private</div>
      {
        user?.email &&
        <div>
          <div>Email: {user.email}</div>
          <button onClick={() => logout()}>Logout</button>
        </div> 
      }
    </div>
  )
}

export default Auth(Vaccine);
