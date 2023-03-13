import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Divider } from "primereact/divider";
import { Checkbox } from "primereact/checkbox";
import { Column } from "primereact/column";
import { Message } from "primereact/message";
import styles from "./styles.module.css";
import { PendingElement, Container } from "../../components";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import {
  TUser,
  TUsersList,
  useGetUsersQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
} from "../../data-provider";
import { useAuth0 } from "@auth0/auth0-react";
import { callExternalApi } from "./external-api.service";
import axios from "axios";

// const apiServerUrl = import.meta.env.VITE_API_LOCAL_SERVER_URL;

// export const getProtectedResource = async (accessToken) => {
//   const config = {
//     url: `${apiServerUrl}/users`,
//     method: "GET",
//     headers: {
//       "content-type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//   };

//   const { data, error } = await callExternalApi({ config });

//   return {
//     data: data || null,
//     error,
//   };
// };

function ManageUsers() {
  const [users, setUsers] = useState<TUser[] | undefined>(undefined);
  const [selectedUser, setSelectedUser] = useState<TUser | undefined>(
    undefined
  );
  const { getAccessTokenSilently } = useAuth0();
  const getUsersQuery = useGetUsersQuery();
  const createUserMutation = useCreateUserMutation();
  // const getUserByIdQuery = useGetUserByIdQuery(selectedUser!.id);
  const updateUserByIdMutation = useUpdateUserByIdMutation();
  const deleteUserByIdMutation = useDeleteUserByIdMutation();

  useEffect(() => {
    if (getUsersQuery.data) {
      setUsers(getUsersQuery.data.users);
    }
  }, [getUsersQuery.data]);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
      setFirst(event.first);
      setRows(event.rows);
  };

  return (
    <Container>
      {getUsersQuery.isLoading && <PendingElement />}
      {getUsersQuery.isError && (
        <Message
          severity="error"
          text={`API Error: ${getUsersQuery.error?.message}`}
        />
      )}
      {getUsersQuery.data && (
        <div className={styles.card}>
        <DataTable value={users} stripedRows tableStyle={{ minWidth: "50rem" }}>
          <Column field="id" header="ID"></Column>
          <Column field="firstName" header="First Name"></Column>
          <Column field="lastName" header="Last Name"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="role" header="Role"></Column>
          <Column field="createdAt" header="Created"></Column>
          <Column field="updatedAt" header="Last Updated"></Column>
        </DataTable>
        <Paginator first={first} rows={rows} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
      </div>
      )}
    </Container>
  );
}

export default ManageUsers;
