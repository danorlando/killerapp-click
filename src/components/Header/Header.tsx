import { Button } from "primereact/button";
import { useAuthServiceContext } from "../../contexts";
import { useNavigate } from "react-router-dom";

function header() {
  const { loginWithRedirect, logout, isAuthenticated } =
    useAuthServiceContext();
  const navigate = useNavigate();
  return (
    <header>
      <div className="surface-0">
        <div className="flex align-items-start flex-column sm:justify-content-between sm:flex-row">
          <div>
            <div className="font-medium text-3xl text-900 text-primary m-3">
              AI Power Apps
            </div>
            {/* <div className="flex align-items-center text-700 flex-wrap">
              <div className="mr-5 flex align-items-center mt-3">
                <i className="pi pi-users mr-2"></i>
                <span>332 Active Users</span>
              </div>
              <div className="mr-5 flex align-items-center mt-3">
                <i className="pi pi-globe mr-2"></i>
                <span>9402 Sessions</span>
              </div>
              <div className="flex align-items-center mt-3">
                <i className="pi pi-clock mr-2"></i>
                <span>2.32m Avg. Duration</span>
              </div>
            </div> */}
          </div>
          <div className="flex gap-3 my-3 mx-3 justify-content-center">
            <Button
              label="ChatGPT+"
              aria-label="Chat GPT plus"
              className="p-button-outlined"
              onClick={() => {
                navigate("/gpt-plus");
              }}
            />
            <Button
              label="GPTPlaylist"
              aria-label="GPT playlist"
              className="p-button-outlined"
              onClick={() => {
                navigate("/gpt-playlist");
              }}
            />
            {!isAuthenticated() ? (
              <Button
                label="Login"
                aria-label="Login"
                onClick={() => loginWithRedirect()}
                className="p-button-outlined"
                icon="pi pi-user-plus"
              />
            ) : (
              <>
                <Button
                  label="Logout"
                  aria-label="Logout"
                  onClick={() => logout()}
                  className="p-button-outlined"
                  icon="pi pi-user-plus"
                />
                <Button
                  label="Manage Users"
                  aria-label="Manage Users"
                  className="p-button-outlined"
                  icon="pi pi-user-plus"
                  onClick={() => {
                    navigate("/users");
                  }}
                ></Button>
              </>
            )}
            <Button label="Save" icon="pi pi-check" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default header;
