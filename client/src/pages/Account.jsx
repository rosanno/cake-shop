import ProfileForm from "../components/ProfileForm";
import ProfilePasswordForm from "../components/ProfilePasswordForm";
import Container from "../components/ui/Container";

const Account = () => {
  return (
    <Container>
      <section className="mt-5 md:mt-10">
        <div>
          <h3 className="text-lg">Account</h3>
          <p className="text-xs text-neutral-400">
            Manage your account profile
          </p>
          <div className="border-b border-gray-300/40 my-3" />
        </div>
        <div className="shadow-sm bg-gray-50 rounded-sm p-4 mt-5">
          <div>
            <h3 className="text-base">Profile Information</h3>
            <p className="text-xs text-neutral-400">
              Update your account&apos;s profile
            </p>
          </div>
          <ProfileForm />
        </div>
        <div className="shadow-sm bg-gray-50 rounded-sm p-4 mt-5">
          <div>
            <h3 className="text-base">Manage Password</h3>
            <p className="text-xs text-neutral-400">
              Update your account&apos;s password
            </p>
          </div>
          <ProfilePasswordForm />
        </div>
      </section>
    </Container>
  );
};

export default Account;
