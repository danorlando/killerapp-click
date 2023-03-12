import { Route, Routes } from "react-router-dom";
import { MusicSuggestor, ManageUsers } from "../containers";
import Callback from "./Callback";
import { NotFound } from "./NotFound";
import { PendingElement } from "../components";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MusicSuggestor />} />
      <Route path="/users" element={<ManageUsers />} />
      <Route
        path="/callback"
        element={<Callback pendingElement={<PendingElement />} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
